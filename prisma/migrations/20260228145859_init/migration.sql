-- CreateEnum
CREATE TYPE "VoiceVariant" AS ENUM ('SYSTEM', 'CUSTOM');

-- CreateEnum
CREATE TYPE "VoiceCategory" AS ENUM ('AUDIOBOOK', 'CONVERSATIONAL', 'CUSTOMER_SERVICE', 'GENERAL', 'NARRATIVE', 'CHARACTERS', 'MEDITATION', 'MOTIVATIONAL', 'PODCAST', 'ADVERTISING', 'VOICEOVER', 'CORPORATE');

-- CreateTable
CREATE TABLE "voice" (
    "id" TEXT NOT NULL,
    "orgId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "VoiceCategory" NOT NULL DEFAULT 'GENERAL',
    "language" TEXT NOT NULL DEFAULT 'en-US',
    "variant" "VoiceVariant" NOT NULL,
    "r2ObjectKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generation" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "voiceId" TEXT,
    "voiceName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "r2ObjectKey" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL,
    "topP" DOUBLE PRECISION NOT NULL,
    "topK" INTEGER NOT NULL,
    "repetitionPenalty" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "voice_variant_idx" ON "voice"("variant");

-- CreateIndex
CREATE INDEX "voice_orgId_idx" ON "voice"("orgId");

-- CreateIndex
CREATE INDEX "generation_orgId_idx" ON "generation"("orgId");

-- CreateIndex
CREATE INDEX "generation_voiceId_idx" ON "generation"("voiceId");

-- AddForeignKey
ALTER TABLE "generation" ADD CONSTRAINT "generation_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
