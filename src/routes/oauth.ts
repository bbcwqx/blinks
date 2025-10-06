import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { env } from "../lib/env.ts";

const app = new Hono();

app.get("/oauth/callback", async (c) => {
  const params = new URLSearchParams(c.req.url.split("?")[1]);
  try {
    const { session } = await c.get("ctx").oauthClient.callback(params);

    setCookie(c, "did", session.did, {
      httpOnly: true,
      secure: !env.APP_DEV,
      sameSite: "Lax",
    });

    return c.redirect(`/profile/${session.did}`);
  } catch (err) {
    console.error({ err }, "oauth callback failed");
    return c.redirect("/");
  }
});

export default app;
