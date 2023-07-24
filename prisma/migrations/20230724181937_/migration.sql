/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Costumers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Costumers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costumers" ADD COLUMN     "cep" INTEGER NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Costumers_cpf_key" ON "Costumers"("cpf");
