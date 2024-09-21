import { z } from "zod";
import {
  pgTableCreator,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Function to create tables with a specific prefix
export const createTable = pgTableCreator((name) => `quickchat_${name}`);

// Define the User table
export const user = createTable("user", {
  id: varchar("id").unique(),
  email: varchar("email").unique(),
  username: varchar("username"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  image_url: varchar("image_url"),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

// Zod schema for API responses
export const userSchema = z.object({
  id: z.string().openapi({ example: "123" }),
  email: z.string().email().openapi({ example: "john.doe@example.com" }),
  username: z.string().openapi({ example: "johndoe" }),
  firstName: z.string().openapi({ example: "John" }),
  lastName: z.string().openapi({ example: "Doe" }),
  image_url: z
    .string()
    .url()
    .nullable()
    .openapi({ example: "https://example.com/images/john_doe.png" }),
  isActive: z.boolean().openapi({ example: true }),
  createdAt: z.string().openapi({ example: "2024-09-20T08:11:32.068Z" }),
});

// Parameter schema for user ID
export const userParamSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "123",
    }),
});
