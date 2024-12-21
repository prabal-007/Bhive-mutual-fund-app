/*
  Warnings:

  - You are about to drop the column `name` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `investedAmoun` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemeId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemeName` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "name",
ADD COLUMN     "investedAmoun" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "schemeId" TEXT NOT NULL,
ADD COLUMN     "schemeName" TEXT NOT NULL;
