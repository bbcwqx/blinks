import { Hono } from "hono";
import {
  createOAuthClient,
  createSessionClient,
  oauthSessions,
  sessionStore,
} from "../lib/auth/client.ts";

const app = new Hono();

app.get("/oauth/callback", async (c) => {
  const { code, state } = c.req.query();
  try {
    const oauthClient = createOAuthClient("temp");
    const tokens = await oauthClient.handleCallback({ code, state });
    const sessionId = await oauthSessions.createOAuthSession(tokens);

    if (!sessionId) {
      throw new Error("Failed to create session");
    }

    const sessionCookie = sessionStore.createSessionCookie(sessionId);

    let userInfo;
    try {
      const sessionOAuthClient = createOAuthClient(sessionId);
      userInfo = await sessionOAuthClient.getUserInfo();
    } catch (error) {
      console.error("Failed to get user info:", error);
    }

    if (userInfo?.sub) {
      try {
        const userClient = createSessionClient(sessionId);
        await userClient.syncUserCollections();
        console.log("Synced Bluesky profile for", userInfo.sub);
      } catch (error) {
        console.error("Error syncing Bluesky profile:", error);
      }
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/profile/" + userInfo?.sub,
        "Set-Cookie": sessionCookie,
      },
    });
  } catch (err) {
    console.error({ err }, "oauth callback failed");
    return c.redirect("/");
  }
});

export default app;
