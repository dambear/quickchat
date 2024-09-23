import type { Context } from "hono";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  type UserInterface,
} from "prisma/lib/functions/user";

export const getUserById_Handler = async (c: Context): Promise<Response> => {
  const id = c.req.param("id");

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

export const getUsers_Handler = async (c: Context): Promise<Response> => {
  try {
    const userData: UserInterface[] = await getUsers();
    return c.json(userData, 200);
  } catch (error) {
    console.error("Error retrieving users:", (error as Error).message);
    return c.json({ message: (error as Error).message }, 500);
  }
};

export const createUser_Handler = async (c: Context): Promise<Response> => {
  try {
    const body: UserInterface = await c.req.json();
    const { id, email, username, firstName, lastName, imageUrl } = body;

    const userData: UserInterface = {
      id: id ?? "",
      email: email ?? "",
      username: username ?? "",
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      imageUrl: imageUrl ?? "",
    };

    const user = await createUser(userData);
    return c.json(user, 201);
  } catch (error) {
    console.error("Error retrieving users:", (error as Error).message);
    return c.json({ message: (error as Error).message }, 500);
  }
};

export const updateUser_Handler = async (c: Context): Promise<Response> => {
  try {
    const body: UserInterface = await c.req.json();
    const { id, email, username, firstName, lastName, imageUrl } = body;

    const userData: UserInterface = {
      id: id ?? "",
      email: email ?? "",
      username: username ?? "",
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      imageUrl: imageUrl ?? "",
    };

    const user = await updateUser(userData.id, userData);
    return c.json(user, 200);
  } catch (error) {
    console.error("Error retrieving users:", (error as Error).message);
    return c.json({ message: (error as Error).message }, 500);
  }
};
