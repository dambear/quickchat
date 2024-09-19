ALTER TABLE "quickchat_user" RENAME COLUMN "clerkid" TO "userid";--> statement-breakpoint
ALTER TABLE "quickchat_user" DROP CONSTRAINT "quickchat_user_clerkid_unique";--> statement-breakpoint
ALTER TABLE "quickchat_user" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "quickchat_user" ADD COLUMN "is_active" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "quickchat_user" ADD CONSTRAINT "quickchat_user_userid_unique" UNIQUE("userid");