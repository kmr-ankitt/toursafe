/*
  Warnings:

  - Added the required column `password` to the `tourist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tourist" ADD COLUMN     "password" VARCHAR(255) NOT NULL;
