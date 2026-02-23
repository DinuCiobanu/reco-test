import { createBrowserRouter, Navigate } from "react-router";
import AppDiscovery from "./AppDiscovery/AppDiscovery";
import AppInventory from "./AppInventory/AppInventory";
import Settings from "./Settings/Settings";
import NotFound from "./NotFound/NotFound";
import MainLayout from "../layouts/MainLayout/MainLayout";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/apps-discovery" replace />,
      },
      {
        path: "apps-discovery",
        element: <AppDiscovery />,
      },
      {
        path: "apps-inventory",
        element: <AppInventory />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
