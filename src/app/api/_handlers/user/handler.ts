/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Context } from "hono";
import {
  getUserById,
  getUsers,
  type UserInterface,
} from "prisma/lib/functions/user";

export const getUserById_Handler = async (c: Context): Promise<Response> => {
  const id = c.req.param("id") as string; 

  try {
    const userData: UserInterface | null = await getUserById(id);
    if (!userData) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(userData, 200);
  } catch (error) {
    console.error("Error retrieving user:", (error as Error).message);
    return c.json({ message: (error as Error).message }, 500);
  }
};

export const getAllUsers_Handler = async (c: Context): Promise<Response> => {
  try {
    const userData: UserInterface[] = await getUsers();
    return c.json(userData, 200);
  } catch (error) {
    console.error("Error retrieving users:", (error as Error).message);
    return c.json({ message: (error as Error).message }, 500);
  }
};
