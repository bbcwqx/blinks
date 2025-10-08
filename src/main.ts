import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import template from "./app.tsx";
import { AtProtoClient } from "./lib/generated_client.ts";
import { context } from "./middleware.ts";
import routes from "./routes/mod.ts";

declare module "hono" {
  interface ContextVariableMap {
    ctx: {
      atproto: {
        publicClient: AtProtoClient;
      };
      auth: {
        currentUser: {
          sub: string;
          name?: string;
          email?: string;
        } | null;
        sessionId: string | null;
      };
    };
  }
}

const app = new Hono();

app.use(logger());
app.use(serveStatic({ root: "./static" }));
app.use(template);
app.use(context);

app.route("/", routes);

export default {
  fetch: app.fetch,
} satisfies Deno.ServeDefaultExport;
