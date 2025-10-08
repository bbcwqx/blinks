import { createMiddleware } from "hono/factory";
import {
  createOAuthClient,
  publicClient,
  sessionStore,
} from "./lib/auth/client.ts";

export const context = createMiddleware(async (c, next) => {
  let auth;

  const session = await sessionStore.getSessionFromRequest(c.req.raw);
  if (!session) {
    auth = { currentUser: null, sessionId: null };
  } else {
    try {
      const sessionOAuthClient = createOAuthClient(session.sessionId);
      const userInfo = await sessionOAuthClient.getUserInfo();
      auth = {
        currentUser: userInfo || null,
        sessionId: session.sessionId,
      };
    } catch {
      auth = { currentUser: null, sessionId: session.sessionId };
    }
  }

  c.set("ctx", {
    auth,
    atproto: {
      publicClient,
    },
  });

  await next();
});
