ALTER TYPE "state" ADD VALUE 'archived';--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "grading" integer DEFAULT 0 NOT NULL;