CREATE TABLE IF NOT EXISTS "quickchatuser" (
	"clerkid" text NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quickchatuser_clerkid_unique" UNIQUE("clerkid"),
	CONSTRAINT "quickchatuser_email_unique" UNIQUE("email")
);
