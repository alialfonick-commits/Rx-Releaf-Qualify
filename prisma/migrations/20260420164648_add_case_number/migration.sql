/*
  Warnings:

  - A unique constraint covering the columns `[caseNumber]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "caseNumber" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exam_caseNumber_key" ON "Exam"("caseNumber");
