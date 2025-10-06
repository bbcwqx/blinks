import { Agent } from "@atproto/api";
import { Context } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { createClient } from "./lib/auth/client.ts";

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

export const context = createMiddleware(async (c, next) => {
  c.set("ctx", {
    oauthClient: createClient(c),
    getSessionAgent: () => getSessionAgent(c),
  });
  await next();
});
