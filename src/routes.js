import React from "react";

// Admin — core
import MainDashboard  from "views/admin/default";
import Profile        from "views/admin/profile";

// Admin — fleet
import Fleet            from "views/admin/fleet";
import AddVehicle       from "views/admin/fleet/AddVehicle";
import VehicleProfilePage from "views/admin/fleet/VehicleProfilePage";
import VehicleEditPage    from "views/admin/fleet/VehicleEditPage";

// Admin — users
import UsersPage         from "views/admin/users/UsersPage";
import UserCreatePage    from "views/admin/users/UserCreatePage";
import UserEditPage      from "views/admin/users/UserEditPage";
import UserProfilePage   from "views/admin/users/UserProfilePage";
import TrainerCreatePage from "views/admin/users/UserTrainerCreatePage";

// Admin — partners
import PartnersPage            from "views/admin/partners/PartnersPage";
import PartnerCreatePage       from "views/admin/partners/PartnerCreatePage";
import PartnerEditPage         from "views/admin/partners/PartnerEditPage";
import PartnerProfilePage      from "views/admin/partners/PartnerProfilePage";
import PartnerDriverCreatePage from "views/admin/partners/PartnerDriverCreatePage";

// Admin — brands
import BrandsPage        from "views/admin/brands/BrandsPage";
import BrandCreatePage   from "views/admin/brands/BrandCreatePage";
import BrandEditPage     from "views/admin/brands/BrandEditPage";
import BrandProfilePage  from "views/admin/brands/BrandProfilePage";

// Admin — models
import ModelsPage        from "views/admin/models/ModelsPage";
import ModelCreatePage   from "views/admin/models/ModelCreatePage";
import ModelEditPage     from "views/admin/models/ModelEditPage";
import ModelProfilePage  from "views/admin/models/ModelProfilePage";

// Admin — managers
import ManagersPage       from "views/admin/managers/ManagersPage";
import ManagerCreatePage  from "views/admin/managers/ManagerCreatePage";
import ManagerEditPage    from "views/admin/managers/ManagerEditPage";
import ManagerProfilePage from "views/admin/managers/ManagerProfilePage";

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
  { name: "Vehicle Profile", layout: "/admin", path: "fleet/:uid",      component: <VehicleProfilePage /> },
  { name: "Edit Vehicle",    layout: "/admin", path: "fleet/:uid/edit", component: <VehicleEditPage />    },
  { name: "Users",           layout: "/admin", path: "users",                    component: <UsersPage />              },
  { name: "Create User",     layout: "/admin", path: "users/create",             component: <UserCreatePage />         },
  { name: "Create Trainer",  layout: "/admin", path: "users/trainer/create",     component: <TrainerCreatePage />      },
  { name: "User Profile",    layout: "/admin", path: "users/:uid",               component: <UserProfilePage />        },
  { name: "Edit User",       layout: "/admin", path: "users/:uid/edit",          component: <UserEditPage />           },
  { name: "Partners",           layout: "/admin", path: "partners",                 component: <PartnersPage />           },
  { name: "Create Partner",     layout: "/admin", path: "partners/create",          component: <PartnerCreatePage />      },
  { name: "Create Driver",      layout: "/admin", path: "partners/driver/create",   component: <PartnerDriverCreatePage />},
  { name: "Partner Profile",    layout: "/admin", path: "partners/:uid",            component: <PartnerProfilePage />     },
  { name: "Edit Partner",       layout: "/admin", path: "partners/:uid/edit",       component: <PartnerEditPage />        },
  { name: "Brands",             layout: "/admin", path: "brands",                   component: <BrandsPage />             },
  { name: "Create Brand",       layout: "/admin", path: "brands/create",            component: <BrandCreatePage />        },
  { name: "Brand Profile",      layout: "/admin", path: "brands/:uid",              component: <BrandProfilePage />       },
  { name: "Edit Brand",         layout: "/admin", path: "brands/:uid/edit",         component: <BrandEditPage />          },
  { name: "Models",             layout: "/admin", path: "models",                   component: <ModelsPage />             },
  { name: "Create Model",       layout: "/admin", path: "models/create",            component: <ModelCreatePage />        },
  { name: "Model Profile",      layout: "/admin", path: "models/:uid",              component: <ModelProfilePage />       },
  { name: "Edit Model",         layout: "/admin", path: "models/:uid/edit",         component: <ModelEditPage />          },
  { name: "Managers",           layout: "/admin", path: "managers",                 component: <ManagersPage />           },
  { name: "Create Manager",     layout: "/admin", path: "managers/create",          component: <ManagerCreatePage />      },
  { name: "Manager Profile",    layout: "/admin", path: "managers/:uid",            component: <ManagerProfilePage />     },
  { name: "Edit Manager",       layout: "/admin", path: "managers/:uid/edit",       component: <ManagerEditPage />        },
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
