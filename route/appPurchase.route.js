const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

// Plans
router.get("/plans", paymentController.getAllProductPlans);

// Payment
router.post("/checkout", paymentController.checkout);
router.post("/webhook", paymentController.webhook);
router.get("/status", paymentController.status);
router.post("/cancel", paymentController.cancel);
router.post("/change-plan", paymentController.changePlan);

module.exports = router;




// https://medium.com/@rhythm6194/implement-apple-ios-in-app-purchase-receipt-verification-in-node-js-app-server-notification-a10878bae69f