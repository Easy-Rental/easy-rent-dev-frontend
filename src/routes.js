import React from "react";

// Admin — core
import MainDashboard  from "views/admin/default";
import Profile        from "views/admin/profile";

// Admin — fleet
import Fleet          from "views/admin/fleet";
import AddVehicle     from "views/admin/fleet/AddVehicle";

// Admin — stubs
import Bookings       from "views/admin/bookings";
import Notifications  from "views/admin/notifications";
import Favourites     from "views/admin/favourites";
import Recents        from "views/admin/recents";

// Auth
import SignIn         from "views/auth/SignIn";

// Icons
import {
  MdHome,
  MdPerson,
  MdLock,
  MdOutlineDirectionsCar,
  MdAssignment,
  MdFavoriteBorder,
  MdHistory,
  MdNotificationsNone,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Fleet",
    layout: "/admin",
    path: "fleet",
    icon: <MdOutlineDirectionsCar className="h-6 w-6" />,
    component: <Fleet />,
  },
  {
    name: "Add Vehicle",
    layout: "/admin",
    path: "fleet/add",
    icon: <MdOutlineDirectionsCar className="h-6 w-6" />,
    component: <AddVehicle />,
  },
  {
    name: "Bookings",
    layout: "/admin",
    path: "bookings",
    icon: <MdAssignment className="h-6 w-6" />,
    component: <Bookings />,
  },
  {
    name: "Favourites",
    layout: "/admin",
    path: "favourites",
    icon: <MdFavoriteBorder className="h-6 w-6" />,
    component: <Favourites />,
  },
  {
    name: "Recents",
    layout: "/admin",
    path: "recents",
    icon: <MdHistory className="h-6 w-6" />,
    component: <Recents />,
  },
  {
    name: "Notifications",
    layout: "/admin",
    path: "notifications",
    icon: <MdNotificationsNone className="h-6 w-6" />,
    component: <Notifications />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];

export default routes;
