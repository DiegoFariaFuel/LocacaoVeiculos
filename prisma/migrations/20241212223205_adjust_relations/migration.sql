/*
  Warnings:

  - You are about to drop the column `contratoId` on the `Veiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placa]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chassi]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anoFabricacao` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chassi` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modeloId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placa` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_contratoId_fkey";

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "contratoId",
ADD COLUMN     "anoFabricacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "chassi" TEXT NOT NULL,
ADD COLUMN     "cor" TEXT NOT NULL,
ADD COLUMN     "modeloId" INTEGER NOT NULL,
ADD COLUMN     "placa" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ContratoVeiculo" (
    "id" SERIAL NOT NULL,
    "contratoLocacaoId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,

    CONSTRAINT "ContratoVeiculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContratoVeiculo_contratoLocacaoId_veiculoId_key" ON "ContratoVeiculo"("contratoLocacaoId", "veiculoId");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_chassi_key" ON "Veiculo"("chassi");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContratoVeiculo" ADD CONSTRAINT "ContratoVeiculo_contratoLocacaoId_fkey" FOREIGN KEY ("contratoLocacaoId") REFERENCES "ContratoLocacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContratoVeiculo" ADD CONSTRAINT "ContratoVeiculo_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
