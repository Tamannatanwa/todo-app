/*
  Warnings:

  - You are about to drop the `ProductPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropTable
DROP TABLE "ProductPlan";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "productplan" (
    "plan_id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "billing_cycle" "Plan_Cycle" NOT NULL DEFAULT 'once',

    CONSTRAINT "productplan_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "subscription_id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "productplan"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
