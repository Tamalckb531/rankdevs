/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apiKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiKey` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyStats` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubUserName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyStats` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStats` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyStats` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlyStats` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "apiKey" TEXT NOT NULL,
ADD COLUMN     "codeforcesLink" TEXT,
ADD COLUMN     "dailyStats" JSONB NOT NULL,
ADD COLUMN     "githubUserName" TEXT NOT NULL,
ADD COLUMN     "leetcodeLink" TEXT,
ADD COLUMN     "monthlyStats" JSONB NOT NULL,
ADD COLUMN     "peerlistLink" TEXT,
ADD COLUMN     "totalStats" JSONB NOT NULL,
ADD COLUMN     "twitterUsername" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weeklyStats" JSONB NOT NULL,
ADD COLUMN     "yearlyStats" JSONB NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");
