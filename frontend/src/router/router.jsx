import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

export default router;
