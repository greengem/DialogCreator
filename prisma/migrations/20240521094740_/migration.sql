/*
  Warnings:

  - The primary key for the `Flow` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_flowId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_flowId_fkey";

-- AlterTable
ALTER TABLE "Edge" ALTER COLUMN "flowId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Flow" DROP CONSTRAINT "Flow_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Flow_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Flow_id_seq";

-- AlterTable
ALTER TABLE "Node" ALTER COLUMN "flowId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
