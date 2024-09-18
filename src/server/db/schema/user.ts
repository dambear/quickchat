import { pgTableCreator, serial, text, timestamp } from "drizzle-orm/pg-core";

// Function to create tables with a specific prefix
export const createTable = pgTableCreator((name) => `quickchat_${name}`);

// Define the User table
export const user = createTable("user", {
  user_id: serial("user_id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").unique().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export default user;
