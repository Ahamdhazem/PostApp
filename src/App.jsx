import "./App.css";
import Button from "react-bootstrap/Button";
import NavBar from "./Components/NavBar/NavBar.jsx";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <NavBar
        token={token}
        setToken={setToken}
        user={user }
        setUser={setUser}
      />
      <Outlet context={{ token, setToken, user, setUser }} />
    </>
  );
}
