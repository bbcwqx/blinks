import { Hono } from "hono";
import { AppBskyActorProfile } from "../lib/generated_client.ts";

const app = new Hono();

app.get("/profile/:id", async (c) => {
  const id = c.req.param("id");
  const { publicClient } = c.var.ctx.atproto;
  let profile: AppBskyActorProfile | undefined;

  try {
    const profileResult = await publicClient.app.bsky.actor.profile.getRecord({
      uri: `at://${id}/app.bsky.actor.profile/self`,
    });

    if (profileResult) {
      profile = profileResult.value;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  return c.render(
    <>
      <h1 class="font-bold text-4xl">{profile?.displayName}</h1>
      <p class="whitespace-pre-line">{profile?.description}</p>
    </>,
  );
});

export default app;
