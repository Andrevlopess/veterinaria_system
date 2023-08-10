-- CreateTable
CREATE TABLE "Costumers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Costumers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "microchip" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "specieId" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "neutered" BOOLEAN NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Costumers_email_key" ON "Costumers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Costumers_cpf_key" ON "Costumers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_microchip_key" ON "Animal"("microchip");

-- CreateIndex
CREATE UNIQUE INDEX "AnimalSpecie_specie_key" ON "AnimalSpecie"("specie");

-- CreateIndex
CREATE UNIQUE INDEX "AnimalBreed_breed_key" ON "AnimalBreed"("breed");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "AnimalSpecie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "AnimalBreed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalBreed" ADD CONSTRAINT "AnimalBreed_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "AnimalSpecie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
