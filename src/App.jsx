import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import LandingPage from "views/landing";
import { AuthProvider, ADMIN_PANEL_ROLES } from "context/AuthContext";
import { ToastProvider } from "context/ToastContext";
import ProtectedRoute from "components/auth/ProtectedRoute";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace" }}>
          <h2 style={{ color: "red" }}>App crashed</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {this.state.error?.message}
            {"\n\n"}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
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
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
