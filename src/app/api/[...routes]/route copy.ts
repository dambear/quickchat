import { handle } from "hono/vercel";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserRoute } from "../_routes/user/route";
import { getUser } from "../_handlers/user/handler";

// Create an instance of OpenAPIHono
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

// Define Users api
app.openapi(getUserRoute, getUser);

// Export handler for Vercel Edge Functions
export const GET = handle(app);
