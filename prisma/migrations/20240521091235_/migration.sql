-- CreateTable
CREATE TABLE "Flow" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "position" JSONB NOT NULL,
    "flowId" INTEGER NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "flowId" INTEGER NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Flow_userId_idx" ON "Flow"("userId");

-- CreateIndex
CREATE INDEX "Node_flowId_idx" ON "Node"("flowId");

-- CreateIndex
CREATE INDEX "Edge_flowId_idx" ON "Edge"("flowId");

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
