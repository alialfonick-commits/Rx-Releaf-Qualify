/*
  Warnings:

  - You are about to drop the column `clinic` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `pharmacyPackage` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('PENDING', 'INVITED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "clinic",
DROP COLUMN "pharmacyPackage",
ADD COLUMN     "isPhoneVisit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "providerName" TEXT,
ADD COLUMN     "status" "ExamStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "consultationType" DROP DEFAULT,
ALTER COLUMN "paymentStatus" DROP DEFAULT;
