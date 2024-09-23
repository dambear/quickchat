import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getUsers_Handler,
  getUserById_Handler,
  createUser_Handler,
  updateUser_Handler,
} from "../_handlers/handler";
import { createRoute } from "@hono/zod-openapi";
import {
  zod_createUserSchema,
  zod_updateUserSchema,
  zod_userParamSchema,
  zod_userSchema,
} from "prisma/lib/zodSchema/user";

export const app = new OpenAPIHono();

// Route for getting a user by ID
const getUserRoute = createRoute({
  method: "get",
  path: "/api/users/{id}",
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

const getUsersRoute = createRoute({
  method: "get",
  path: "/api/users",
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

const createUserRoute = createRoute({
  method: "post",
  path: "/api/create-user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zod_createUserSchema, // Schema for the new user payload
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: zod_userSchema, // Response schema for the created user
        },
      },
      description: "User created successfully",
    },
    400: {
      description: "Invalid input data",
    },
    500: {
      description: "Error creating user",
    },
  },
  tags: ["User"],
});

const updateUserRoute = createRoute({
  method: "put", // or "patch" if you prefer
  path: "/api/users/{id}",
  request: {
    params: zod_userParamSchema,
    body: {
      content: {
        "application/json": {
          schema: zod_updateUserSchema, // Schema for the new user payload
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zod_userSchema, // Response schema for the updated user
        },
      },
      description: "User updated successfully",
    },
    404: {
      description: "User not found",
    },
    400: {
      description: "Invalid input data",
    },
    500: {
      description: "Error updating user",
    },
  },
  tags: ["User"],
});

// Register the route with the handler
app.openapi(getUserRoute, getUserById_Handler);

app.openapi(getUsersRoute, getUsers_Handler);

app.openapi(createUserRoute, createUser_Handler);

app.openapi(updateUserRoute, updateUser_Handler);
