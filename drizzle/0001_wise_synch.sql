ALTER TABLE "quickchatuser" RENAME TO "quickchat_user";--> statement-breakpoint
ALTER TABLE "quickchat_user" DROP CONSTRAINT "quickchatuser_clerkid_unique";--> statement-breakpoint
ALTER TABLE "quickchat_user" DROP CONSTRAINT "quickchatuser_email_unique";--> statement-breakpoint
ALTER TABLE "quickchat_user" ADD CONSTRAINT "quickchat_user_clerkid_unique" UNIQUE("clerkid");--> statement-breakpoint
ALTER TABLE "quickchat_user" ADD CONSTRAINT "quickchat_user_email_unique" UNIQUE("email");