import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.render(
    <div class="max-w-3xl mx-auto text-center space-y-8 my-8">
      <h1 class="text-5xl font-extrabold mb-4">
        blinks
      </h1>
      <p class="text-xl">
        links to stuff
      </p>
    </div>,
  );
});

export default app;
