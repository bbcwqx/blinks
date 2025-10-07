import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import Navbar from "./components/navbar.tsx";

export default jsxRenderer(({ children }) => {
  const c = useRequestContext();
  const { bskyProfile } = c.get("ctx");

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
        <Navbar bskyProfile={bskyProfile} />
        <main class="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
});
