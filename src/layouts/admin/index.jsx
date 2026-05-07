import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import routes from "routes.js";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Dashboard");

  React.useEffect(() => {
    const handleResize = () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    routes.forEach((r) => {
      if (window.location.href.includes(r.layout + "/" + r.path)) {
        setCurrentRoute(r.name);
      }
    });
  }, [location.pathname]);

  const getRoutes = (routes) =>
    routes.map((prop, key) =>
      prop.layout === "/admin" ? (
        <Route path={prop.path} element={prop.component} key={key} />
      ) : null
    );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* ── Sidebar ── */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden xl:ml-[160px]">

        {/* Sticky Navbar */}
        <Navbar
          onOpenSidenav={() => setOpen(true)}
          brandText={currentRoute}
          {...rest}
        />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-5">
          <Routes>
            {getRoutes(routes)}
            <Route path="/" element={<Navigate to="/admin/default" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}
