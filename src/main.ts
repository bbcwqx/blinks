import { Agent, AppBskyActorDefs } from "@atproto/api";
import { NodeOAuthClient } from "@workspace/oauth-client";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import template from "./app.tsx";
import { context } from "./middleware.ts";
import routes from "./routes/mod.ts";

declare module "hono" {
  interface ContextVariableMap {
    ctx: {
      oauthClient: NodeOAuthClient;
      getSessionAgent: () => Promise<Agent | null>;
      bskyProfile: AppBskyActorDefs.ProfileViewDetailed | undefined;
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
