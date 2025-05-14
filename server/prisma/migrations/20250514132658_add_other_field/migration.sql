-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT 'Hey there! Welcome to my dashboard',
ADD COLUMN     "firstname" TEXT NOT NULL DEFAULT 'Human',
ADD COLUMN     "imgLink" TEXT,
ADD COLUMN     "isHireable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastname" TEXT NOT NULL DEFAULT 'Dev',
ADD COLUMN     "location" TEXT DEFAULT 'Earth';
