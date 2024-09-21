import { handle } from "hono/vercel";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { getAllUsersRoute, getUserRoute } from "../_routes/user/route";
import { getAllUsers, getUser } from "../_handlers/user/handler";

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

// Register the route with the handler
app.openapi(getUserRoute, getUser);

app.openapi(getAllUsersRoute, getAllUsers);

// Export handler for Vercel Edge Functions
export const GET = handle(app);
