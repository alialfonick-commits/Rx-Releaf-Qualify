/*
  Warnings:

  - You are about to drop the column `data` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `patientState` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treatment` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthSex` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BirthSex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ConsultationType" AS ENUM ('URGENT_CARE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_staffId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "data",
ADD COLUMN     "clinic" TEXT NOT NULL DEFAULT 'Rx Releaf',
ADD COLUMN     "consultationType" "ConsultationType" NOT NULL DEFAULT 'URGENT_CARE',
ADD COLUMN     "patientState" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentLink" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "pharmacyPackage" TEXT NOT NULL DEFAULT 'Provider Selects (Best Price)',
ADD COLUMN     "treatment" TEXT NOT NULL,
ALTER COLUMN "staffId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "birthSex" "BirthSex" NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
