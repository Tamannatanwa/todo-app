const { prisma } = require("../config/psqlConn");

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
    const plan = await prisma.productPlan.findUnique({
      where: { planId: planId },
    });

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    const existingPlan = await prisma.subscription.findFirst({
      where: {
        userId: userId,
        status: "ACTIVE",
      },
    });
    if (existingPlan) {
      return res.status(400).json({ msg: "already active plan hai" });
    }

    res.status(200).json({ msg: "checkout" });
  } catch (err) {
    next(err);
  }
};



const webhook = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "webhook" });
  } catch (err) {
    next(err);
  }
};

const status = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "status" });
  } catch (err) {
    next(err);
  }
};

const cancel = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "cancel" });
  } catch (err) {
    next(err);
  }
};

const changePlan = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "changePlan" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProductPlans,
  checkout,
  webhook,
  status,
  cancel,
  changePlan,
};
