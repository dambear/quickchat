import { z } from "zod";

export const zod_userSchema = z.object({
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

export const zod_createUserSchema = z.object({
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
});

export const zod_updateUserSchema = z.object({
  email: z
    .string()
    .email()
    .optional()
    .openapi({ example: "john.doe@example.com" }),
  username: z.string().optional().openapi({ example: "johndoe" }),
  firstName: z.string().optional().openapi({ example: "John" }),
  lastName: z.string().optional().openapi({ example: "Doe" }),
  image_url: z
    .string()
    .url()
    .nullable()
    .optional()
    .openapi({ example: "https://example.com/images/john_doe.png" }),
  isActive: z.boolean().optional().openapi({ example: true }),
});

// Parameter schema for user ID
export const zod_userParamSchema = z.object({
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
