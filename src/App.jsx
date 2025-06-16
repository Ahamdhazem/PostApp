import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack } from "react-bootstrap";
import NavBar from "./NavBar";
import Posts from "./Posts";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
function App() {
  const [LognFormData, setLognFormData] = useState({
    UserName: "",
    Password: "",
  });

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
    // <div id="AppContainer">
    //   <NavBar id="NaveBar" />
    //   <Posts />
    // </div>
  );
}

export default App;
