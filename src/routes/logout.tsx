import { Hono } from "hono";
import { oauthSessions, sessionStore } from "../lib/auth/client.ts";

const app = new Hono();

app.get("/logout", async (c) => {
  const session = await sessionStore.getSessionFromRequest(c.req.raw);

  if (session) {
    await oauthSessions.logout(session.sessionId);
  }

  const clearCookie = sessionStore.createLogoutCookie();

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": clearCookie,
    },
  });
});

export default app;
