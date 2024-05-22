/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Flow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flow_userId_name_key" ON "Flow"("userId", "name");
