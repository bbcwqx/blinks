import { DenoKVOAuthStorage, OAuthClient } from "@slices/oauth";
import { DenoKVAdapter, SessionStore, withOAuthSession } from "@slices/session";
import { AtProtoClient } from "../generated_client.ts";
import { env } from "../env.ts";
import { kv } from "../kv.ts";

// OAuth setup
export const oauthStorage = new DenoKVOAuthStorage(kv);
export const oauthConfig = {
  clientId: env.OAUTH_CLIENT_ID,
  clientSecret: env.OAUTH_CLIENT_SECRET,
  authBaseUrl: env.OAUTH_AIP_BASE_URL,
  redirectUri: env.OAUTH_REDIRECT_URI,
  scopes: ["atproto", "openid", "profile"],
};

// Configure sessions with Deno KV adapter
export const sessionStore = new SessionStore({
  adapter: new DenoKVAdapter(kv),
  cookieName: "links-session",
  cookieOptions: {
    httpOnly: true,
    secure: env.APP_ENV !== "dev",
    sameSite: "lax",
    path: "/",
  },
});

// OAuth + Session integration
export const oauthSessions = withOAuthSession(
  sessionStore,
  oauthConfig,
  oauthStorage,
  {
    autoRefresh: true,
  },
);

// Helper function to create user-scoped OAuth client
export function createOAuthClient(userId: string): OAuthClient {
  return new OAuthClient(oauthConfig, oauthStorage, userId);
}

// Helper function to create authenticated AtProto client for a user
export function createSessionClient(userId: string): AtProtoClient {
  const userOAuthClient = createOAuthClient(userId);
  return new AtProtoClient(env.API_URL, env.SLICE_URI!, userOAuthClient);
}

// Public client for unauthenticated requests
export const publicClient = new AtProtoClient(env.API_URL, env.SLICE_URI);
