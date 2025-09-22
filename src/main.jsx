import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// src/index.js or src/main.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Pages/ProfilePage/Profile.jsx";
import NavBar from "./Components/NavBar/NavBar.jsx";
import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Comments from "./Pages/Comments/Comments.jsx";
import NotFound from "./Pages/NotFound.jsx";

function Layout() {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
}

// Update your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/Profile", element: <Profile /> },
      { path: "/:userid", element: <Profile /> },
      { path: "/:userid/:postID", element: <Comments /> },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const Root = (
  <>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </>
);
createRoot(document.getElementById("root")).render(Root);
