import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";
import { useAuth } from "context/AuthContext";
import { userStorage, tokenStorage } from "lib/authClient";

function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
          <MdDirectionsCar className="h-7 w-7 animate-pulse text-brand-500" />
        </div>
        <p className="text-sm font-medium text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

/**
 * allowedRoles — array of roles that can access this route.
 * If omitted, any authenticated user is allowed.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { session, isPending, role } = useAuth();
  const location = useLocation();

  // Read localStorage directly — always reflects the latest saved value,
  // unlike AuthContext state which is seeded once on mount and can be stale
  // immediately after sign-in (before React re-renders the provider).
  const storedUser  = userStorage.get();
  const storedToken = tokenStorage.get();
  const hasLocalCredentials = !!(storedUser && storedToken);

  const effectiveSession = session ?? (hasLocalCredentials ? { user: storedUser } : null);
  const effectiveRole    = role    ?? storedUser?.role ?? null;
  const effectivePending = isPending && !hasLocalCredentials;

  if (effectivePending) return <LoadingScreen />;

  if (!effectiveSession) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(effectiveRole)) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}
