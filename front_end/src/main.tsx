import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.scss";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./shared/Navbar/Navbar";
import { SignUp } from "./pages/SignUp/SignUp";
import { LogIn } from "./pages/LogIn/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/inscription",
    element: <SignUp />,
    // children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/connexion",
    element: <LogIn />,
    // children: [{ path: "/", element: <Home /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
