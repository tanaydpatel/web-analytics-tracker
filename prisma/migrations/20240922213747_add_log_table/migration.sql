-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "trackingId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_trackingId_idx" ON "Log"("trackingId");

-- CreateIndex
CREATE INDEX "Log_userId_idx" ON "Log"("userId");
