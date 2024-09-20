ALTER TABLE "quickchat_user" RENAME COLUMN "userid" TO "id";--> statement-breakpoint
ALTER TABLE "quickchat_user" DROP CONSTRAINT "quickchat_user_userid_unique";--> statement-breakpoint
ALTER TABLE "quickchat_user" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "quickchat_user" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "quickchat_user" ALTER COLUMN "username" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "quickchat_user" ALTER COLUMN "first_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "quickchat_user" ALTER COLUMN "last_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "quickchat_user" ALTER COLUMN "image_url" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "quickchat_user" ADD CONSTRAINT "quickchat_user_id_unique" UNIQUE("id");