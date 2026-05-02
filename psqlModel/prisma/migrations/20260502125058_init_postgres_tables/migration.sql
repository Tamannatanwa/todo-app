-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'canceled', 'expired');

-- CreateEnum
CREATE TYPE "Plan_Cycle" AS ENUM ('monthly', 'yearly', 'once');

-- CreateTable
CREATE TABLE "ProductPlan" (
    "plan_id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "billing_cycle" "Plan_Cycle" NOT NULL DEFAULT 'once',

    CONSTRAINT "ProductPlan_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscription_id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ProductPlan"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
