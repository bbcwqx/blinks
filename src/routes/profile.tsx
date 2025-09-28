import { Agent } from "@atproto/api";
import { Hono } from "hono";
import { env } from "../lib/env.ts";

const app = new Hono();
const agent = new Agent({ service: env.ATPROTO_PUBLIC_API });

app.get("/profile/:id", async (c) => {
  const id = c.req.param("id");
  const { data } = await agent.getProfile({ actor: id });

  return c.render(
    <>
      <h1 class="font-bold text-4xl">{data.displayName}</h1>
      <p class="whitespace-pre-line">{data.description}</p>
    </>,
  );
});

export default app;
