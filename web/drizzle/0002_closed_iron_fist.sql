ALTER TABLE "games" DROP CONSTRAINT "games_model_models_name_fk";
--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "modelName" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_model_models_id_fk" FOREIGN KEY ("model") REFERENCES "models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
