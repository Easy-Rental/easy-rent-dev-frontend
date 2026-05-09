import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "lib/authClient";
import { tokenStorage, userStorage } from "lib/authClient";

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
      // Server confirmed the session — keep localStorage in sync
      userStorage.save(serverSession.user);
      setLocalUser(serverSession.user);
    } else if (!isPending && serverSession === null) {
      // Server explicitly says no session — clear local storage
      tokenStorage.clear();
      userStorage.clear();
      setLocalUser(null);
    }
  }, [serverSession, isPending]);

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
