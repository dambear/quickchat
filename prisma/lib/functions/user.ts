import { db } from "../db";

// Define the UserInterface based on your Prisma schema
export interface UserInterface {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  isActive?: boolean;
  createdAt?: Date;
}

export const createUser = async (
  userData: UserInterface,
): Promise<UserInterface> => {
  const user = await db.user.create({
    data: {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      imageUrl: userData.imageUrl,
      isActive: userData.isActive,
      createdAt: userData.createdAt,
    },
  });

  return user;
};

export const getUserById = async (
  id: string,
): Promise<UserInterface | null> => {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
};

export const getUsers = async (): Promise<UserInterface[]> => {
  const users = await db.user.findMany();
  return users;
};

export const updateUser = async (
  id: string,
  updateData: Partial<UserInterface>,
): Promise<UserInterface> => {
  const user = await db.user.update({
    where: { id },
    data: updateData,
  });
  return user;
};

export const deleteUser = async (id: string): Promise<UserInterface> => {
  const user = await db.user.delete({
    where: { id },
  });
  return user;
};
