-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "completedAt" DROP NOT NULL;