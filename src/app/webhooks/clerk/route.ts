import { Webhook } from "svix";
import { headers } from "next/headers";

import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import type { NewUser } from "~/server/db/schema/user";

import type { WebhookEvent } from "@clerk/nextjs/server";


export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = (await req.json()) as unknown;

  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      evt.data;

    const email = email_addresses[0]?.email_address // Default to null if undefined

    try {
      const createdUser: NewUser[] = await db
        .insert(user)
        .values({
          id: id, // User ID
          email: email, // User email
          username: username, // Username
          firstName: first_name, // First name
          lastName: last_name, // Last name
          image_url: image_url,
          
        })
        .returning();

      return createdUser[0]; // Return the created user
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Re-throw the error after logging
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
