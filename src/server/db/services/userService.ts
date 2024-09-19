"use server";

import { db } from "../index";
import { user } from "../schema/user";

import { eq } from "drizzle-orm";

// Define the UserData interface
interface UserData {
  userid: string;
  email?: string;
  username: string;
  firstName: string;
  lastName: string;
  image_url?: string;
}

export async function createUser(userData: UserData) {
  try {
    const { userid, email, username, firstName, lastName, image_url } =
      userData;

    // Ensure all required fields are present
    if (!userid || !email || !username || !firstName || !lastName) {
      throw new Error("Missing required user data.");
    }

    // Insert the new user into the user table
    const result = await db
      .insert(user)
      .values({
        userid,
        email,
        username,
        firstName,
        lastName,
        image_url,
      })
      .returning();

    console.log("User created successfully:", result);
  } catch (error) {
    // Type-safe error handling
    if (error instanceof Error) {
      console.error("Error creating user:", error.message);
    } else {
      console.error("Error creating user:", String(error)); // Fallback to string conversion
    }
  }
}

// Function to update an existing user
export async function updateUser(userid: string, userData: Partial<UserData>) {
  try {
    // Update the user in the user table
    const result = await db
      .update(user)
      .set(userData)
      .where(eq(user.userid, userid))
      .returning();

    console.log("User updated successfully:", result);
  } catch (error) {
    // Type-safe error handling
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
    } else {
      console.error("Error updating user:", String(error)); // Fallback to string conversion
    }
  }
}

// Function to delete a user by userid
export async function deleteUser(userid: string) {
  try {
    // Delete the user from the user table
    const result = await db
      .delete(user)
      .where(eq(user.userid, userid))
      .returning();

    if (result.length > 0) {
      console.log("User deleted successfully:", result);
    } else {
      console.log("User not found.");
    }
  } catch (error) {
    // Type-safe error handling
    if (error instanceof Error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.error("Error deleting user:", String(error)); // Fallback to string conversion
    }
  }
}
