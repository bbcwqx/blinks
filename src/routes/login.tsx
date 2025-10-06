import { isValidHandle } from "@atproto/syntax";
import { Hono } from "hono";
import { env } from "../lib/env.ts";
import { isValidUrl } from "../lib/utils.ts";

const app = new Hono();

app.post("/login", async (c) => {
  const formData = await c.req.formData();
  const id = formData.get("id-or-url") || env.ATPROTO_BSKY_PDS;

  if (typeof id !== "string" || (!isValidHandle(id) && !isValidUrl(id))) {
    throw new Error("Invalid handle");
  }

  const url = await c.get("ctx").oauthClient.authorize(
    id,
    {
      scope: "atproto transition:generic",
    },
  );

  return c.redirect(url.toString());
});

app.get("/login", (c) => {
  return c.render(
    <div class="card max-w-lg mx-auto bg-background border-none mt-24">
      <header class="text-center font-bold text-2xl">
        <h2>Login</h2>
      </header>
      <section class="grid gap-6">
        <form method="post">
          <button
            type="submit"
            class="btn bg-[rgb(10,122,255)] text-white w-full"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 600 530"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
            >
              <path
                d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
                fill="currentColor"
              />
            </svg>Sign in with Bluesky
          </button>
        </form>
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="bg-background px-2 text-muted-foreground">
              Or @AtProtocol Account
            </span>
          </div>
        </div>
        <form class="form grid gap-6" method="post">
          <div class="grid gap-2">
            <label for="id-or-url">
              Enter your Handle or PDS URL
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                @
              </span>
              <input
                type="text"
                id="id-or-url"
                name="id-or-url"
                placeholder="alice.bsky.social, https://bsky.social"
                class="pl-8"
                required
              />
            </div>
            <small class="text-muted-foreground">
              Handle resolution via{" "}
              <code>{env.ATPROTO_PUBLIC_API.replace("https://", "")}</code>
            </small>
          </div>
          <button class="btn" type="submit">Continue</button>
        </form>
      </section>
      <footer class="flex items-center text-center text-sm mx-auto">
        <span class="text-muted-foreground">
          Don't have an account?
        </span>
        <form method="post" class="inline">
          <button
            type="submit"
            class="btn-link font-bold border-none p-1"
          >
            Sign up
          </button>
        </form>
      </footer>
    </div>,
  );
});

export default app;
