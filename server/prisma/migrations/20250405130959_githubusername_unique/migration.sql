/*
  Warnings:

  - A unique constraint covering the columns `[githubUserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_githubUserName_key" ON "User"("githubUserName");
