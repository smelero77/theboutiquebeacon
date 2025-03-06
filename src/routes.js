// Layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Componente que controla el acceso a rutas protegidas.
import PrivateRoute from "./components/PrivateRoute";

const routes = [
  {
    type: "main",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    type: "main",
    path: "/tables",
    component: Tables,
  },
  {
    type: "main",
    path: "/billing",
    component: Billing,
  },
  {
    type: "main",
    path: "/rtl",
    component: RTL,
  },
  {
    type: "main",
    path: "/notifications",
    component: Notifications,
  },
  {
    type: "main",
    path: "/profile",
    component: Profile,
  },
  {
    type: "auth",
    path: "/authentication/sign-in",
    component: SignIn,
  },
  {
    type: "auth",
    path: "/authentication/sign-up",
    component: SignUp,
  },
];

export default routes;
