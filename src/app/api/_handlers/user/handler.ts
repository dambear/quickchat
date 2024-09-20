import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import type { Context } from "hono";

export const getUser = async (c: Context) => {
  const id = c.req.param.valid("id");


  try {
    const userRecord = await db.query.user?.findFirst({
      where: eq(user.id, id),
    });

    if (!userRecord) {
      return c.json({ message: "User not found" }, 404); // Specify 404
    }

    return c.json(userRecord);
  } catch (error: unknown) {
    console.error(error);
    return c.json({ message: "Error retrieving user" }, 500); // Specify 505
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const users = await db.query.user.findMany(); // Fetch all users
    return c.json(users);
  } catch (error: unknown) {
    console.error("Error retrieving users:", error);
    return c.json(
      { message: "Error retrieving users", error: String(error) },
      500,
    );
  }
};
