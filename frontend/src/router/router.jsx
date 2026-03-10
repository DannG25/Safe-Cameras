import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Home from "../pages/Dashboard.jsx";
// import About from "./pages/About.jsx";
// import Services from "./pages/Services.jsx";
// import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
    //   { path: "about", element: <About /> },
    //   { path: "services", element: <Services /> },
    //   { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;