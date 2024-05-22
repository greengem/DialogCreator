-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_flowId_fkey";

-- DropForeignKey
ALTER TABLE "Flow" DROP CONSTRAINT "Flow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_flowId_fkey";

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
