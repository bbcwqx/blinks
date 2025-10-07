import { Agent } from "@atproto/api";
import { Context } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { createClient } from "./lib/auth/client.ts";

export async function getSessionAgent(
  c: Context,
  oauthClient: ReturnType<typeof createClient>,
) {
  const did = getCookie(c, "did");

  if (!did) {
    return null;
  }

  try {
    const oauthSession = await oauthClient.restore(did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    deleteCookie(c, "did");
    return null;
  }
}

export const context = createMiddleware(async (c, next) => {
  const oauthClient = createClient(c);
  const sessionAgent = await getSessionAgent(c, oauthClient);

  let profile;

  if (sessionAgent?.did) {
    profile = (await sessionAgent.getProfile({
      actor: sessionAgent.did,
    })).data;
  }

  c.set("ctx", {
    oauthClient: oauthClient,
    getSessionAgent: () => getSessionAgent(c, createClient(c)),
    bskyProfile: profile,
  });

  await next();
});
