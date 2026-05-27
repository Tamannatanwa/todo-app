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




// https://medium.com/@rhythm6194/implement-apple-ios-in-app-purchase-receipt-verification-in-node-js-app-server-notification-a10878bae69f