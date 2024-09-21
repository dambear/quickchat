import { Webhook } from "svix";
import { headers } from "next/headers";

import type { WebhookEvent } from "@clerk/nextjs/server";

import { createUser } from "~/server/db/services/user";


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

    const email = email_addresses[0]?.email_address ?? null; // Default to null if undefined

    // Prepare user data for creation, ensuring types match NewUser
    const newUser = {
      id: id ?? null, // Ensure id is null if undefined
      email: email ?? null, // Ensure email is null if undefined
      username: username ?? null, // Ensure username is null if undefined
      firstName: first_name ?? null, // Use firstName as per NewUser type
      lastName: last_name ?? null, // Use lastName as per NewUser type
      image_url: image_url ?? null, // Ensure image_url is null if undefined
      isActive: false, // Default value
      createdAt: new Date(), // Current date
    };

    // Call createUser and handle the response
    try {
      const createdUser = await createUser(newUser);
      console.log("User created successfully:", createdUser);
    } catch (error) {
      console.error("Error during user creation:", error);
      // Handle error as needed
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
