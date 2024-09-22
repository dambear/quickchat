import { handle } from "hono/vercel";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import {
  getAllUsers_Handler,
  getUserById_Handler,
} from "../_handlers/user/handler";

import { createRoute } from "@hono/zod-openapi";
import { zod_userParamSchema, zod_userSchema } from "prisma/lib/zodSchema/user";

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

// Route for getting a user by ID
const getUserRoute = createRoute({
  method: "get",
  path: "/api/users/[id]",
  request: {
    params: zod_userParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zod_userSchema,
        },
      },
      description: "Retrieve the user",
    },
    404: {
      description: "User not found",
    },
    500: {
      description: "Error retrieving user",
    },
  },
  tags: ["User"],
});

const getAllUsersRoute = createRoute({
  method: "get",
  path: "api/users",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zod_userSchema,
        },
      },
      description: "Retrieve all user records",
    },
    500: {
      description: "Error retrieving users",
    },
  },
  tags: ["User"],
});

// Register the route with the handler
app.openapi(getUserRoute, getUserById_Handler);

app.openapi(getAllUsersRoute, getAllUsers_Handler);

// Export handler for Vercel Edge Functions
export const GET = handle(app);
