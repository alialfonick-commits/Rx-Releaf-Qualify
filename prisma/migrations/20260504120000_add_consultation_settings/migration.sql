-- AlterEnum
ALTER TYPE "ConsultationType" ADD VALUE IF NOT EXISTS 'GOOD_FAITH';
ALTER TYPE "ConsultationType" ADD VALUE IF NOT EXISTS 'QUALIPHY_RX';
ALTER TYPE "ConsultationType" ADD VALUE IF NOT EXISTS 'CHOOSE_PHARMACY';

-- CreateTable
CREATE TABLE "ConsultationTypeSetting" (
    "id" TEXT NOT NULL,
    "typeKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationTypeSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationOptionSetting" (
    "id" TEXT NOT NULL,
    "consultationTypeId" TEXT NOT NULL,
    "qualiphyExamId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "rxType" INTEGER,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationOptionSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationTypeSetting_typeKey_key" ON "ConsultationTypeSetting"("typeKey");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationOptionSetting_consultationTypeId_qualiphyExamId_key" ON "ConsultationOptionSetting"("consultationTypeId", "qualiphyExamId");

-- CreateIndex
CREATE INDEX "ConsultationOptionSetting_qualiphyExamId_idx" ON "ConsultationOptionSetting"("qualiphyExamId");

-- AddForeignKey
ALTER TABLE "ConsultationOptionSetting" ADD CONSTRAINT "ConsultationOptionSetting_consultationTypeId_fkey" FOREIGN KEY ("consultationTypeId") REFERENCES "ConsultationTypeSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
