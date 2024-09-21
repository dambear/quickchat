import { handle } from "hono/vercel";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { eq } from "drizzle-orm";
import { user } from "~/server/db/schema/user";
import type { Context } from "hono";
import { db } from "~/server/db";
import { z } from "zod";

const app = new OpenAPIHono();

// Define your OpenAPI specification
app.doc("/api/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

// Define Swagger UI endpoint
app.get("/api/ui", swaggerUI({ url: "/api/doc" }));

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
const userParamSchema = z.object({
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

// Route for getting a user by ID
const getUserRoute = createRoute({
  method: "get",
  path: "/api/users/{id}",
  request: {
    params: userParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: userSchema,
        },
      },
      description: "Retrieve the user",
    },
    404: {
      description: "User not found",
    },
  },
});

// Handler for getting a user by ID
const getUser = async (c: Context) => {
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

// Register the route with the handler
app.openapi(getUserRoute, getUser);

// Export handler for Vercel Edge Functions
export const GET = handle(app);
