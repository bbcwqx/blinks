import { NodeOAuthClient } from "@workspace/oauth-client";
import { Context } from "hono";
import { env } from "../env.ts";
import { SessionStore, StateStore } from "./storage.ts";

export const createClient = (c: Context) => {
  const publicUrl = env.APP_URL;
  const url = publicUrl || `http://127.0.0.1:${env.APP_PORT}`;
  const enc = encodeURIComponent;
  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "blinks",
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${
          enc(`${url}/oauth/callback`)
        }&scope=${enc("atproto transition:generic")}`,
      client_uri: url,
      redirect_uris: [`${url}/oauth/callback`],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    },
    handleResolver: env.ATPROTO_HANDLE_RESOLVER,
    stateStore: new StateStore(c),
    sessionStore: new SessionStore(c),
  });
};
