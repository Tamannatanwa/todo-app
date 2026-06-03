const { prisma } = require("../../config/psqlConn");
require("dotenv").config(); 

const seeds = async () => {
  try {
    const plans = [
      {
        planName: "Pro Monthly",
        priceInCents: 5100, // ₹51
        billingCycle: "MONTHLY",
        stripePriceId: process.env.STRIPE_PRICE_MONTHLY,
      },
      {
        planName: "Pro Yearly",
        priceInCents: 999900, // ₹9999
        billingCycle: "YEARLY",
        stripePriceId: process.env.STRIPE_PRICE_YEARLY,
      },
      {
        planName: "Pro Lifetime",
        priceInCents: 2499900, // ₹24999
        billingCycle: "ONCE",
        stripePriceId: process.env.STRIPE_PRICE_LIFETIME,
      },
    ];

    for (const plan of plans) {
      await prisma.productPlan.upsert({
        where: { stripePriceId: plan.stripePriceId },
        update: {},   
        create: plan, 
      });
    }

    console.log("✅ Plans seeded successfully!");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

seeds();