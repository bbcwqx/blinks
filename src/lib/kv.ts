import { env } from "./env.ts";

export const kv = await Deno.openKv(env.DATABASE_URL);
