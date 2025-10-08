import { recordBlobToCdnUrl } from "@slices/client";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import Navbar from "./components/navbar.tsx";
import { AppBskyActorProfile } from "./lib/generated_client.ts";

export default jsxRenderer(async ({ children }) => {
  const c = useRequestContext();
  const { auth, atproto: { publicClient } } = c.var.ctx;
  let profile: AppBskyActorProfile | undefined;
  let avatarUrl: string | undefined;

  if (auth.currentUser) {
    try {
      const profileResult = await publicClient.app.bsky.actor.profile.getRecord(
        {
          uri: `at://${auth.currentUser.sub}/app.bsky.actor.profile/self`,
        },
      );

      if (profileResult) {
        profile = profileResult.value;

        if (profile.avatar) {
          avatarUrl = recordBlobToCdnUrl(
            profileResult,
            profile.avatar,
            "avatar",
          );
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/styles.css" rel="stylesheet" />
        <link rel="icon" href="https://fav.farm/📘" />
        <title>blinks</title>
        <script src="/basecoat/basecoat.min.js" defer></script>
        <script src="/basecoat/dropdown-menu.min.js" defer></script>
      </head>
      <body class="min-h-screen">
        <Navbar
          bskyProfile={profile}
          bskyAvatarUrl={avatarUrl}
          did={auth?.currentUser?.sub}
        />
        <main class="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
});
