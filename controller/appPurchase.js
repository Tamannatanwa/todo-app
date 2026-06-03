const { prisma } = require("../config/psqlConn");
const stripe = require("../stripe/stripe.client")

const getAllProductPlans = async (req, res, next) => {
  try {
    const allPlans = await prisma.productPlan.findMany();
    return res.status(200).json({
      data: allPlans,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};




const checkout = async (req, res, next) => {
  try {
    const { planId } = req.body;
    const { userId } = req.user;

    // Step 1 - Plan dhundo
    const plan = await prisma.productPlan.findUnique({
      where: { planId: planId },
    });

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    // Step 2 - Active subscription check karo
    const existingPlan = await prisma.subscription.findFirst({
      where: { userId: userId, status: "ACTIVE" },
    });
    if (existingPlan) {
      return res.status(400).json({ msg: "Already active plan hai" });
    }

    // Step 3 - User ka stripeCustomerId nikalo
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Step 4 - Stripe checkout session banao
    const isSubscription = plan.billingCycle === "MONTHLY" || plan.billingCycle === "YEARLY";

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      mode: isSubscription ? "subscription" : "payment",
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: String(userId),
        planId: String(planId),
      },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Step 5 - URL bhejo frontend ko
    return res.status(200).json({
      checkoutUrl: session.url,
    });

  } catch (err) {
    next(err);
  }
};






const status = async (req, res, next) => {
  const { userId } = req.user;

  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { plan: true }  
  });

  if (!subscription) {
    return res.status(200).json({ msg: "No active plan" });
  }

  return res.status(200).json({
    plan: subscription.plan.planName,
    status: subscription.status,
    endDate: subscription.endDate,
  });
};




const cancel = async (req, res, next) => {
  const { userId } = req.user;

  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: "ACTIVE" }
  });

  if (!subscription) {
    return res.status(404).json({ msg: "No active subscription" });
  }

  if (subscription.stripeSubId) {
    await stripe.subscriptions.cancel(subscription.stripeSubId);
  }

 
  await prisma.subscription.update({
    where: { subscriptionId: subscription.subscriptionId },
    data: { status: "CANCELED" }
  });

  return res.status(200).json({ msg: "Subscription canceled" });
};



const changePlan = async (req, res, next) => {
  const { userId } = req.user;
  const { planId } = req.body;


  const existing = await prisma.subscription.findFirst({
    where: { userId, status: "ACTIVE" }
  });

  if (!existing) {
    return res.status(404).json({ msg: "No active subscription" });
  }


  if (existing.stripeSubId) {
    await stripe.subscriptions.cancel(existing.stripeSubId);
  }


  await prisma.subscription.update({
    where: { subscriptionId: existing.subscriptionId },
    data: { status: "CANCELED" }
  });


  const newPlan = await prisma.productPlan.findUnique({
    where: { planId }
  });

 
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId,
    mode: newPlan.billingCycle === "ONCE" ? "payment" : "subscription",
    line_items: [{ price: newPlan.stripePriceId, quantity: 1 }],
    metadata: { userId: String(userId), planId: String(planId) },
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  return res.status(200).json({ checkoutUrl: session.url });
};




module.exports = {
  getAllProductPlans,
  checkout,
  status,
  cancel,
  changePlan,
};

