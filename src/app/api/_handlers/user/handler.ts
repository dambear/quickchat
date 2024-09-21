import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import type { User } from "~/server/db/schema/user";
import type { Context } from "hono";

export const getUser = async (c: Context) => {
  // Directly extract the ID from the request's path
  const id = c.req.param("id");

  try {
    const userRecord = await db.query.user?.findFirst({
      where: eq(user.id, id), // Ensure this matches your schema
    });

    if (!userRecord) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json(userRecord);
  } catch (error: unknown) {
    console.error("Error retrieving user:", error);
    return c.json({ message: "Error retrieving user" }, 500);
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const users: User[] = await db.query.user.findMany(); // Fetch all users
    return c.json(users, 200);
  } catch (error: unknown) {
    console.error("Error retrieving users:", error);
    return c.json(
      { message: "Error retrieving users", error: String(error) },
      500,
    );
  }
};

