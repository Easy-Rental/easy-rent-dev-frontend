import React, { createContext, useContext } from "react";
import { useSession } from "lib/authClient";

// Role constants — single source of truth
export const ROLES = {
  ADMIN:           "admin",
  ACCOUNT_MANAGER: "account_manager",
  PARTNER:         "partner",
  USER:            "user",
};

// Which roles can access the admin panel
export const ADMIN_PANEL_ROLES = [ROLES.ADMIN, ROLES.ACCOUNT_MANAGER];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending, error } = useSession();

  const user    = session?.user ?? null;
  const role    = user?.role   ?? null;
  const isAdmin = ADMIN_PANEL_ROLES.includes(role);

  return (
    <AuthContext.Provider value={{ session, user, role, isAdmin, isPending, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
