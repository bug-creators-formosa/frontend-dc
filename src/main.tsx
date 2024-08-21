import Home from "@/pages/home";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "dotenv/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./features/auth/context/provider";
import DashboardLayout from "./layouts/dashboard-layout";
import MainLayout from "./layouts/main-layout";
import UserDetailPage from "./pages/admin-dashboard/user-details";
import UserListPage from "./pages/admin-dashboard/users";

import SignIn from "@/features/auth/components/sign-in";
// import SignUp from "@/features/auth/components/sign-up";

import SignUp from "./features/auth/components/sign-up";
import DashboardIndex from "./pages/admin-dashboard";
import MapPage from "./pages/admin-dashboard/map";
import FormLayout from "./pages/auth/form-layout";
import ConstructionPage from "./pages/construction";
import NotFoundPage from "./pages/not_found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/about", index: true, element: <ConstructionPage /> },
      { path: "/contact", index: true, element: <ConstructionPage /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <FormLayout />,
    path: "/auth/",
    children: [
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/", element: <DashboardIndex />, index: true },
      { path: "/dashboard/users", element: <UserListPage /> },
      { path: "/dashboard/users/:userId", element: <UserDetailPage /> },
      { path: "/dashboard/map", element: <MapPage /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
