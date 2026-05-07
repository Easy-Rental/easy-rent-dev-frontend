import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import LandingPage from "views/landing";
import { AuthProvider, ADMIN_PANEL_ROLES } from "context/AuthContext";
import ProtectedRoute from "components/auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={ADMIN_PANEL_ROLES}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
