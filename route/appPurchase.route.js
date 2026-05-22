const router = require("express").Router();



// 1. PUBLIC PRODUCT CATALOG ROUTES (Your existing routes)


router.get("/plans",getAllProductPlan)
router.get("/plan/:id",getProductPlan)


// 2. USER SUBSCRIPTION MANAGEMENT ROUTES (The additions you need)

router.get("/user/current-plan", requireAuth, getUserCurrentPlan);   // Check active access & permissions
router.get("/user/billing-history", requireAuth, getUserBillingHistory); // View past invoices/receipts
router.post("/user/subscribe", requireAuth, subscribeToPlan);        // Initiate a new purchase/checkout
router.post("/user/change-plan", requireAuth, upgradeOrDowngradePlan); // Switch mid-cycle (pro-rata)
router.post("/user/cancel-plan", requireAuth, cancelSubscription);   // Turn off auto-renew (keep access till end)

module.exports = router;