/*
  Warnings:

  - You are about to drop the column `kyc` on the `tourist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[aadhar_no]` on the table `tourist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aadhar_no` to the `tourist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `tourist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tourist" DROP COLUMN "kyc",
ADD COLUMN     "aadhar_no" TEXT NOT NULL,
ADD COLUMN     "code" INTEGER NOT NULL,
ALTER COLUMN "private_key" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tourist_aadhar_no_key" ON "public"."tourist"("aadhar_no");
