import { Agent } from "@atproto/api";
import { NodeOAuthClient } from "@workspace/oauth-client";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import template from "./app.tsx";
import routes from "./routes/mod.ts";
import { createClient } from "./lib/auth/client.ts";
import { Context } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";

declare module "hono" {
  interface ContextVariableMap {
    oauthClient: NodeOAuthClient;
    getSessionAgent: () => Promise<Agent | null>;
  }
}

export async function getSessionAgent(
  c: Context,
) {
  const did = getCookie(c, "did");

  if (!did) {
    return null;
  }

  try {
    const oauthSession = await c.get("oauthClient").restore(did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    deleteCookie(c, "did");
    return null;
  }
}

const app = new Hono();

app.use(logger());
app.use(template);

app.use(async (c, next) => {
  c.set("oauthClient", createClient(c));
  c.set("getSessionAgent", () => getSessionAgent(c));
  await next();
});

app.use(serveStatic({ root: "./static" }));
app.route("/", routes);

export default {
  fetch: app.fetch,
} satisfies Deno.ServeDefaultExport;
