import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-135f9c19/health", (c) => {
  return c.json({ status: "ok" });
});

// Email signup endpoint for Apps page (Brevo)
app.post("/make-server-135f9c19/email-signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, interestedInPartnerships, source } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // For apps and collective pages, use Brevo API
    if (source === 'apps' || source === 'collective') {
      const brevoApiKey = Deno.env.get('BREVO_API_KEY');
      if (!brevoApiKey) {
        console.error('BREVO_API_KEY not found in environment');
        return c.json({ error: "API key not configured" }, 500);
      }

      // Apps uses list ID 3, Collective uses list ID 4
      const listId = source === 'apps' ? 3 : 4;

      const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': brevoApiKey,
        },
        body: JSON.stringify({
          email,
          listIds: [listId],
          updateEnabled: true,
        }),
      });

      const brevoData = await brevoResponse.json();

      if (!brevoResponse.ok) {
        console.error('Brevo API error:', brevoData);
        // If contact already exists, Brevo returns 400 but that's okay
        if (brevoResponse.status === 400 && brevoData.code === 'duplicate_parameter') {
          console.log(`Contact already exists in Brevo: ${email}`);
          return c.json({ success: true, requiresMailto: interestedInPartnerships });
        }
        return c.json({ error: brevoData.message || "Failed to add contact" }, brevoResponse.status);
      }

      console.log(`Email added to Brevo list ${listId}: ${email}`);
      return c.json({ success: true, requiresMailto: interestedInPartnerships });
    }

    // For other sources, use KV store
    const timestamp = Date.now();
    const sourcePrefix = source || 'apps';
    const key = `email_signup_${sourcePrefix}_${timestamp}`;

    await kv.set(key, {
      email,
      source: sourcePrefix,
      interestedInPartnerships: interestedInPartnerships || false,
      timestamp: new Date().toISOString(),
    });

    console.log(`Email signup stored from ${sourcePrefix}: ${email}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error storing email signup:", error);
    console.error("Error details:", error.message);
    return c.json({ error: `Failed to store email signup: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);