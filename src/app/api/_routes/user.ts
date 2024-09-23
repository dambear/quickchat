/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createRoute } from "@hono/zod-openapi";
import {
  getUsers_Handler,
  getUserById_Handler,
  createUser_Handler,
  updateUser_Handler,
} from "../_handlers/handler";
import {
  zod_createUserSchema,
  zod_updateUserSchema,
  zod_userParamSchema,
  zod_userSchema,
} from "prisma/lib/zodSchema/user";


import { type OpenAPIHono } from "@hono/zod-openapi";

export const userRoutes = (app: OpenAPIHono) => {
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
            schema: zod_createUserSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: zod_userSchema,
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
    method: "put",
    path: "/api/users/{id}",
    request: {
      params: zod_userParamSchema,
      body: {
        content: {
          "application/json": {
            schema: zod_updateUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: zod_userSchema,
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

  // Register routes with handlers
  app.openapi(getUserRoute, getUserById_Handler);
  app.openapi(getUsersRoute, getUsers_Handler);
  app.openapi(createUserRoute, createUser_Handler);
  app.openapi(updateUserRoute, updateUser_Handler);
};
