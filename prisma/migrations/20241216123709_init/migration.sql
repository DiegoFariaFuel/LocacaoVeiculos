/*
  Warnings:

  - You are about to drop the column `marcaId` on the `Modelo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Modelo" DROP CONSTRAINT "Modelo_marcaId_fkey";

-- AlterTable
ALTER TABLE "Modelo" DROP COLUMN "marcaId";
