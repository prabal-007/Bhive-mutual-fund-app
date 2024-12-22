/*
  Warnings:

  - You are about to drop the `Fund` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fund" DROP CONSTRAINT "Fund_portfolioId_fkey";

-- DropTable
DROP TABLE "Fund";
