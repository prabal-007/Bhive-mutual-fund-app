/*
  Warnings:

  - You are about to drop the column `investedAmoun` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `investedAmount` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "investedAmoun",
ADD COLUMN     "investedAmount" DOUBLE PRECISION NOT NULL;
