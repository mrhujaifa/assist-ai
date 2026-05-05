import { createBrowserRouter } from "react-router-dom";

import RegisterPage from "../modules/auth/pages/RegisterPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import RootLayout from "../layouts/RootLayout";
import verifyEmailPage from "../modules/auth/pages/Verify-email-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/auth/register",
    Component: RegisterPage,
  },
  {
    path: "/auth/login",
    Component: LoginPage,
  },
  {
    path: "/auth/verify-email",
    Component: verifyEmailPage,
  },
]);
