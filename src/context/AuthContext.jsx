import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "lib/authClient";
import { userStorage } from "lib/authClient";

export const ROLES = {
  ADMIN:           "admin",
  ACCOUNT_MANAGER: "account_manager",
  PARTNER:         "partner",
  USER:            "user",
};

export const ADMIN_PANEL_ROLES = [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: serverSession, isPending, error } = useSession();

  // Seed from localStorage immediately — avoids flash/redirect on first render
  const [localUser, setLocalUser] = useState(() => userStorage.get());

  useEffect(() => {
    if (serverSession?.user) {
      userStorage.save(serverSession.user);
      setLocalUser(serverSession.user);
    }
    // Do NOT clear on null — GET /get-session returns null because the backend
    // doesn't support Bearer token auth. Clearing here causes a redirect loop.
    // Session is cleared explicitly on sign-out.
  }, [serverSession]);

  const user    = serverSession?.user ?? localUser;
  const role    = user?.role          ?? null;
  const isAdmin = ADMIN_PANEL_ROLES.includes(role);

  // Only block on isPending if there's no local user to fall back to
  const session = serverSession ?? (localUser ? { user: localUser } : null);
  const pending = isPending && localUser === null;

  return (
    <AuthContext.Provider value={{ session, user, role, isAdmin, isPending: pending, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
