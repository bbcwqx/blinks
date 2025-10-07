import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";

const app = new Hono();

app.get("/logout", (c) => {
  const did = getCookie(c, "did");

  if (did) {
    deleteCookie(c, did.replaceAll(":", "_"));
  }
  return c.redirect("/");
});

export default app;
