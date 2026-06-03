const express = require("express");
const paymentController = require("../controller/appPurchase");

const { authMiddlewareJwt } = require("../middlewares/auth.middleware");
const {webhook} = require("../webhooks/webhook.controller")
const router = express.Router();

// Plans

// DB se saare plans nikaal kar user ko dikhana — Monthly, Yearly, Lifetime with price.
router.get("/plans", paymentController.getAllProductPlans);  


// Payment

//auth - middleware  is required for this

// User ne plan choose kiya — Stripe ko bolo "is user ke liye checkout page banao" — Stripe ek URL dega — user wahan jaake pay karega.
router.post("/checkout",authMiddlewareJwt, paymentController.checkout);






// Stripe khud call karta hai jab kuch hota hai — payment hua, subscription cancel hua, payment fail hua — hum DB update karte hain.
router.post("/webhook", webhook);


// User ka current plan check karo — ACTIVE hai ya EXPIRED — frontend ko batao kaun si features dikhani hain.
router.get("/status",authMiddlewareJwt, paymentController.status);

// User ne subscription band karni hai — Stripe ko bolo cancel karo — DB mein status CANCELED karo — end date tak access milta rahega.
router.post("/cancel",authMiddlewareJwt, paymentController.cancel);



// User Monthly se Yearly pe jaana chahta hai — purana plan cancel karo — naya plan shuru karo.
router.post("/change-plan",authMiddlewareJwt, paymentController.changePlan);  



module.exports = router;




// https://medium.com/@rhythm6194/implement-apple-ios-in-app-purchase-receipt-verification-in-node-js-app-server-notification-a10878bae69f