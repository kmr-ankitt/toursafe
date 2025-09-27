/*
  Warnings:

  - You are about to drop the `tourist_id_mapping` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `phn_no` on the `tourist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `aadhar_no` on the `tourist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."tourist_id_mapping" DROP CONSTRAINT "tourist_id_mapping_tourist_id_fkey";

-- DropIndex
DROP INDEX "public"."tourist_phn_no_key";

-- AlterTable
ALTER TABLE "public"."tourist" DROP COLUMN "phn_no",
ADD COLUMN     "phn_no" INTEGER NOT NULL,
DROP COLUMN "aadhar_no",
ADD COLUMN     "aadhar_no" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."tourist_id_mapping";

-- CreateTable
CREATE TABLE "public"."tourist_department" (
    "dept_id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "region" VARCHAR(100),
    "phn_no" VARCHAR(15),
    "password" VARCHAR(255),
    "touristTourist_id" INTEGER,

    CONSTRAINT "tourist_department_pkey" PRIMARY KEY ("dept_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tourist_department_name_region_key" ON "public"."tourist_department"("name", "region");

-- CreateIndex
CREATE UNIQUE INDEX "tourist_aadhar_no_key" ON "public"."tourist"("aadhar_no");

-- AddForeignKey
ALTER TABLE "public"."tourist_department" ADD CONSTRAINT "tourist_department_touristTourist_id_fkey" FOREIGN KEY ("touristTourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE SET NULL ON UPDATE CASCADE;
