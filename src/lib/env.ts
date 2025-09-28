import { constants } from "./constants.ts";

export const env = {
  /** Application environment (e.g., dev, prod) */
  APP_ENV: Deno.env.get("APP_ENV"),
  /** Base URL for the application */
  APP_URL: Deno.env.get("APP_URL"),
  /** Port number for the application server */
  APP_PORT: Deno.env.get("APP_PORT") || constants.defaults.APP_PORT,

  /** AT Protocol public API endpoint */
  ATPROTO_PUBLIC_API: Deno.env.get("ATPROTO_PUBLIC_API") ||
    constants.defaults.ATPROTO_PUBLIC_API,
  /** AT Protocol Bluesky PDS */
  ATPROTO_BSKY_PDS: Deno.env.get("ATPROTO_BSKY_PDS") ||
    constants.defaults.ATPROTO_DEFAULT_PDS,
  /** AT Protocol handle resolver */
  ATPROTO_HANDLE_RESOLVER: Deno.env.get("ATPROTO_HANDLE_RESOLVER") ||
    constants.defaults.ATPROTO_HANDLE_RESOLVER,
};
