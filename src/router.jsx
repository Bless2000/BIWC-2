import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"

import Home from "./pages/Home"
import About from "./pages/About"
import Ministries from "./pages/Ministries"
import MinistrySingle from "./pages/MinistrySingle"
import Media from "./pages/Media"
import Events from "./pages/Events"
import Contact from "./pages/Contact"
import Give from "./pages/Give"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/ministries", element: <Ministries /> },
      { path: "/ministries/:id", element: <MinistrySingle /> },
      { path: "/media", element: <Media /> },
      { path: "/events", element: <Events /> },
      { path: "/contact", element: <Contact /> },
      { path: "/give", element: <Give /> },
    ]
  }
]);

export default router;
