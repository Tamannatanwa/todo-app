const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post(
  "/validatePayment",
  paymentController.validatePayment
);

router.post(
  "/handleWebhook",
  paymentController.handleWebhook
);
module.exports = router;




// router.post('/customers', async (req, res, next) => {
//   try {
//     const { email, name } = req.body
//     const userId = req.user.id

//     const customer = await stripe.customers.create({
//       email,
//       name,
//       metadata: { userId: String(userId) }
//     })

//     // Save Stripe customer ID in your database
//     await prisma.user.update({
//       where: { id: userId },
//       data: { stripeCustomerId: customer.id }
//     })

//     res.json({ customerId: customer.id })
//   } catch (err) {
//     next(err)
//   }
// })



router.post('/create-intent', async (req, res, next) => {
  try {
    const { amount, currency = 'usd', customerId } = req.body
    const userId = req.user.id

    const intentData = {
      amount: Math.round(amount * 100), // cents
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: { userId: String(userId) }
    }

    // Attach to Stripe customer if provided
    if (customerId) {
      intentData.customer = customerId
    }

    const intent = await stripe.paymentIntents.create(intentData)

    res.json({
      clientSecret: intent.client_secret,
      intentId: intent.id
    })
  } catch (err) {
    next(err)
  }
})






// https://medium.com/@rhythm6194/implement-apple-ios-in-app-purchase-receipt-verification-in-node-js-app-server-notification-a10878bae69f