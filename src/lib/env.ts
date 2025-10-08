import { constants } from "./constants.ts";

export function required(key: string): string {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`${key} is required`);
  return value;
}

export const env = {
  /** Application environment (e.g., dev, prod) */
  APP_ENV: Deno.env.get("APP_ENV"),

  /** AT Protocol Bluesky PDS */
  ATPROTO_BSKY_PDS: Deno.env.get("ATPROTO_BSKY_PDS") ||
    constants.defaults.ATPROTO_DEFAULT_PDS,

  /** OAuth client ID for authentication */
  OAUTH_CLIENT_ID: required("OAUTH_CLIENT_ID"),
  /** OAuth client secret for authentication */
  OAUTH_CLIENT_SECRET: required("OAUTH_CLIENT_SECRET"),
  /** OAuth redirect URI for authentication flow */
  OAUTH_REDIRECT_URI: required("OAUTH_REDIRECT_URI"),
  /** OAuth AIP base URL */
  OAUTH_AIP_BASE_URL: required("OAUTH_AIP_BASE_URL"),

  /** API URL for the application */
  API_URL: Deno.env.get("API_URL") || constants.defaults.API_URL,
  /** Slice URI configuration */
  SLICE_URI: required("SLICE_URI"),
  /** Database connection URL */
  DATABASE_URL: Deno.env.get("DATABASE_URL"),
};
