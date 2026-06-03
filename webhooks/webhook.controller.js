const stripe = require("../stripe/stripe.client")
const { prisma } = require("../config/psqlConn");


const webhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    // Step 1 - Signature verify karo
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).json({ msg: "Invalid signature" });
  }

  // Step 2 - Event handle karo
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckout(event.data.object);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }

  res.status(200).json({ received: true });
};


const handleCheckout = async (session) => {
  const userId = parseInt(session.metadata.userId);
  const planId = parseInt(session.metadata.planId);

    // Guard — agar metadata nahi hai toh skip karo
  if (!userId || !planId) {
    console.log("⚠️ No metadata — skipping (CLI test event)");
    return;
  }

  // Step 3 - Plan details nikalo
  const plan = await prisma.productPlan.findUnique({
    where: { planId: planId },
  });

  const isSubscription = plan.billingCycle === "MONTHLY" || plan.billingCycle === "YEARLY";

  // Step 4 - End date calculate karo
  const startDate = new Date();
  let endDate = null;

  if (plan.billingCycle === "MONTHLY") {
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (plan.billingCycle === "YEARLY") {
    endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
  // ONCE/Lifetime ke liye endDate null rahega

  // Step 5 - Subscription banao DB mein
  const subscription = await prisma.subscription.create({
    data: {
      userId,
      planId,
      startDate,
      endDate,
      status: "ACTIVE",
      stripeSubId: isSubscription ? session.subscription : null,
      stripePaymentIntentId: !isSubscription ? session.payment_intent : null,
    },
  });

  // Step 6 - Payment history save karo
  await prisma.paymentHistory.create({
    data: {
      subscriptionId: subscription.subscriptionId,
      amountInCents: session.amount_total,
      currency: session.currency,
      status: "succeeded",
      stripeInvoiceId: session.invoice ?? null,
      paidAt: new Date(),
    },
  });

  console.log("✅ Subscription activated for userId:", userId);
};

module.exports = {
  webhook,
};  



// stripe listen --forward-to localhost:5000/payment/webhook

// litne on this url webhook ko