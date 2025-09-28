import { Hono } from "hono";

const app = new Hono();

app.get("/client-metadata.json", (c) => {
  return c.json(c.get("oauthClient").clientMetadata);
});

export default app;
