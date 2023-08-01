/*
  Warnings:

  - You are about to drop the column `id_breed` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `id_species` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `breedId` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specieId` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "id_breed",
DROP COLUMN "id_species",
ADD COLUMN     "breedId" TEXT NOT NULL,
ADD COLUMN     "specieId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AnimalSpecie" (
    "id" TEXT NOT NULL,
    "specie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimalSpecie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalBreed" (
    "id" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "specieId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimalBreed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimalSpecie_specie_key" ON "AnimalSpecie"("specie");

-- CreateIndex
CREATE UNIQUE INDEX "AnimalBreed_breed_key" ON "AnimalBreed"("breed");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "AnimalSpecie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "AnimalBreed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalBreed" ADD CONSTRAINT "AnimalBreed_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "AnimalSpecie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
