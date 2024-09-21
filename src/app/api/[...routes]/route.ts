import { handle } from "hono/vercel";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { getAllUsers, getUser } from "../_handlers/user/handler";

import { createRoute } from "@hono/zod-openapi";
import { userSchema } from "~/server/db/schema";
import { userParamSchema } from "~/server/db/schema/user";

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
          schema: userSchema,
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
app.openapi(getUserRoute, getUser);

app.openapi(getAllUsersRoute, getAllUsers);

// Export handler for Vercel Edge Functions
export const GET = handle(app);
