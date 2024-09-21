import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import type { User, NewUser } from "~/server/db/schema/user";

export async function getUser(id: string) {
  try {
    const result = await db.query.user?.findFirst({
      where: eq(user.id, id),
    });

    if (!result) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw the error after logging
  }
}

export async function getAllUsers() {
  try {
    const users: User[] = await db.query.user?.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function createUser(userData: User) {
  try {
    const createdUser: NewUser[] = await db
      .insert(user)
      .values({
        id: userData.id, // User ID
        email: userData.email, // User email
        username: userData.username, // Username
        firstName: userData.firstName, // First name
        lastName: userData.lastName, // Last name
        image_url: userData.image_url,
        isActive: userData.isActive, // Default to false if not provided
        createdAt: userData.createdAt,
      })
      .returning();

    return createdUser[0]; // Return the created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error after logging
  }
}
