/*
  Warnings:

  - Made the column `password` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "password" SET NOT NULL;
