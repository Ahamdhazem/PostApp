import React, { useEffect, useState } from "react";
import { Stack, Container, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../GlobalStyle.css";
import LoginModal from "../../Modals/LoginModal";
import RejesterModal from "../../Modals/RejesterModal";
import defaultUser from "../../assets/Images/defaultuser.png";
export default function NavBar({ token, setToken, user, setUser }) {
  const [showLogainModal, setShowLogainModal] = useState(false);
  const [showRejesterModal, setShowRejesterModal] = useState(false);

  const SaveAndCloseRejester = () => {
    setShowRejesterModal(false);
  };
  const SaveAndCloseLogin = () => {
    setShowLogainModal(false);
  };
  const logauot = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };
  return (
    <Container
      //   style={{position:"fixed" ,top:"0"}}
      className="d-flex flex-row justify-content-between bg-primary p-2 shadow-lg"
      fluid="xl"
    >
      <Stack
        gap={5}
        bg="primary"
        direction="horizontal"
        style={{ width: "70%" }}
      >
        <h1>PostApp</h1>
        <Link to={"/"}>
          {" "}
          <button>Home</button>{" "}
        </Link>
        <Link to={`/${user?.id}`}>
          {" "}
          <button>Profile</button>{" "}
        </Link>
      </Stack>
      {token ? (
        <Stack direction="horizontal" className="LoginUser gap-3 ">
          <Link to={`/${user?.id}`}>
            <img
              style={{
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
              }}
              src={
                Object.keys(user?.profile_image).length > 0
                  ? user.profile_image
                  : defaultUser
              }
              alt="User"
            ></img>
          </Link>
          <Button onClick={logauot} variant="danger">
            Logauto
          </Button>
        </Stack>
      ) : (
        <Stack direction="horizontal" className="RegesterAndLogin gap-3 ">
          <Button
            variant="primary"
            className="border border-1"
            onClick={() => setShowLogainModal(true)}
          >
            Login
          </Button>

          <Button
            onClick={() => setShowRejesterModal(true)}
            variant="secondary"
            className="border border-1"
          >
            Rejester
          </Button>
        </Stack>
      )}

      <LoginModal
        showModel={showLogainModal}
        SaveAndClose={SaveAndCloseLogin}
        setToken={setToken}
        setUser={setUser}
      />
      <RejesterModal
        showModel={showRejesterModal}
        SaveAndClose={SaveAndCloseRejester}
        setToken={setToken}
        setUser={setUser}
      />
    </Container>
  );
}
