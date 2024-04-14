ALTER TABLE "games" DROP CONSTRAINT "games_model_models_id_fk";
--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "downloadUrl" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "public" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_model_models_name_fk" FOREIGN KEY ("model") REFERENCES "models"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_name_unique" UNIQUE("name");