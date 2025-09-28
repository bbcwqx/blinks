import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@workspace/oauth-client";
import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export class StateStore implements NodeSavedStateStore {
  constructor(private c: Context) {}

  get(key: string): NodeSavedState | undefined {
    const cookies = getCookie(this.c);
    const result = cookies[key];
    if (!result) return;
    return JSON.parse(result) as NodeSavedState;
  }

  set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);

    setCookie(this.c, key, state, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60, // 1 hour
    });
  }

  del(key: string) {
    deleteCookie(this.c, key);
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private c: Context) {}

  get(key: string): NodeSavedSession | undefined {
    const safeKey = key.replaceAll(":", "_");
    const cookies = getCookie(this.c);
    const result = cookies[safeKey];
    if (!result) return;
    return JSON.parse(result) as NodeSavedSession;
  }

  set(key: string, val: NodeSavedSession) {
    const safeKey = key.replaceAll(":", "_");
    const state = JSON.stringify(val);

    setCookie(this.c, safeKey, state, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  del(key: string) {
    const safeKey = key.replaceAll(":", "_");
    deleteCookie(this.c, safeKey);
  }
}
