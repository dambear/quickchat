
import { createRoute } from "@hono/zod-openapi";
import { zod_userParamSchema, zod_userSchema } from "prisma/lib/zodSchema/user";




// Route for getting a user by ID
export const getUserRoute = createRoute({
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

export const getAllUsersRoute = createRoute({
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
