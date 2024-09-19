import {pgTableCreator, boolean, text, timestamp } from "drizzle-orm/pg-core";


// Function to create tables with a specific prefix
export const createTable = pgTableCreator((name) => `quickchat_${name}`);

// Define the User table
export const user = createTable("user", {
  userid: text("userid").unique().notNull(),
  email: text("email").unique().notNull(),
  username: text("username").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  image_url: text("image_url"),
  isActive: boolean("is_active").notNull().default(false), // Active status
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export default user;
