import { Hono } from "hono";
import index from "./index.tsx";
import login from "./login.tsx";
import logout from "./logout.tsx";
import oauth from "./oauth.ts";
import profile from "./profile.tsx";
import clientMeta from "./client-metadata.ts";

const app = new Hono();

app.route("/", index);
app.route("/", login);
app.route("/", logout);
app.route("/", oauth);
app.route("/", profile);
app.route("/", clientMeta);

export default app;
