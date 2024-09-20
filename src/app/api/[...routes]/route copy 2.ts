import { handle } from "hono/vercel";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { db } from "~/server/db"; // Make sure this is set up correctly
import { userSchema } from "~/server/db/schema"; // Adjust according to your schema
import type { Context } from "hono";

import { getAllUsersRoute } from "../_routes/user/route";
import { getAllUsers } from "../_handlers/user/handler";

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

// Route for getting all users
// const getAllUsersRoute = createRoute({
//   method: "get",
//   path: "/api/users", // Ensure this matches
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: z.array(userSchema),
//         },
//       },
//       description: "Retrieve all users",
//     },
//     500: {
//       description: "Error retrieving users",
//     },
//   },
// });

// Handler for getting all users
// export const getAllUsers = async (c: Context) => {
//   try {
//     const users = await db.query.user.findMany(); // Fetch all users
//     return c.json(users);
//   } catch (error: unknown) {
//     console.error("Error retrieving users:", error);
//     return c.json({ message: "Error retrieving users", error: String(error) }, 500);
//   }
// };

// Register the route
app.openapi(getAllUsersRoute, getAllUsers);

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
});

// Simulated user data for testing
const users: Record<string, { id: string; name: string; age: number }> = {
  "1212121": { id: "1212121", name: "Ultra-man", age: 20 },
  "123": { id: "123", name: "John Doe", age: 42 },
};

const UserSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 42,
    }),
  })
  .openapi("User");

// Route for getting a user by ID
const route = createRoute({
  method: "get",
  path: "/api/users/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
    404: {
      description: "User not found",
    },
  },
});

app.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  const user = users[id];

  if (user) {
    return c.json(user);
  } else {
    return c.json({ message: "User not found" }, 404);
  }
});

// Export handler for Vercel Edge Functions
export const GET = handle(app);
