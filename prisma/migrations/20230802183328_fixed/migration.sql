/*
  Warnings:

  - You are about to drop the column `bithdate` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "bithdate",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
