import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const TOKEN_KEY = "jd_auth_token";
const USER_KEY  = "jd_auth_user";

export const tokenStorage = {
  save:  (token) => localStorage.setItem(TOKEN_KEY, token),
  get:   ()      => localStorage.getItem(TOKEN_KEY),
  clear: ()      => localStorage.removeItem(TOKEN_KEY),
};

export const userStorage = {
  save:  (user)  => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  get:   ()      => { try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; } },
  clear: ()      => localStorage.removeItem(USER_KEY),
};

export const authClient = createAuthClient({
  baseURL: `${process.env.REACT_APP_API_URL?.trim()}/auth`,
  plugins: [adminClient()],
  fetchOptions: {
    credentials: "include",
    onRequest(ctx) {
      const token = tokenStorage.get();
      if (token) {
        if (ctx.headers instanceof Headers) {
          ctx.headers.set("Authorization", `Bearer ${token}`);
        } else if (ctx.headers && typeof ctx.headers === "object") {
          ctx.headers["Authorization"] = `Bearer ${token}`;
        }
      }
    },
  },
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
