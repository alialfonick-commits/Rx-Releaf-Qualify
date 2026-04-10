/*
  Warnings:

  - You are about to drop the column `treatment` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `examId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examName` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "treatment",
ADD COLUMN     "examId" INTEGER NOT NULL,
ADD COLUMN     "examName" TEXT NOT NULL;
