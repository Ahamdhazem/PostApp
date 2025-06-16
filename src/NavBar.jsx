import React, { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import loginUser from "./assets/download.png";
import "./NavBar.css";
import LoginModal from "./Modals/LoginModal";
import RejesterModal from "./Modals/RejesterModal";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRejesterModal, setShowRejesterModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loginUser")) !== null
  );
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") !== null
  );
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  const handleCloseRejesterModal = () => {
    setShowRejesterModal(false);
  };
  const handelLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <>
      {/* {JSON.parse(localStorage.getItem("loginUser"))!==null && <div>login user </div>    } */}
      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLoginModal}
        setIsLogin={setIsLogin}
      />
      <RejesterModal
        show={showRejesterModal}
        closeModal={handleCloseRejesterModal}
        setIsLogin={setIsLogin}
      />
      <Container id="NavContainer">
        <Nav
          id="bootStarpNav"
          className="d-flex flex-row align-items-center shadow mb-5 bg-white rounded justify-content-between"
          activeKey="/home"
        >
          <Container
            id="lefContainer"
            className="d-flex flex-row w-50 align-items-center justify-content-around"
          >
            <Nav.Item>
              <Link className="NavLinks" to="/">
                <h1>PostApp</h1>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="NavLinks" to="/">
                <h4>Home</h4>
              </Link>
            </Nav.Item>
            {isLogin && (
              <Nav.Item>
                <Link className="NavLinks" to="/profile">
                  <h4>Profile</h4>
                </Link>
              </Nav.Item>
            )}
          </Container>
          <Container
            id="rightContainer"
            className="d-flex flex-row w-50 justify-content-center  align-items-center"
          >
            {isLogin == false ? (
              <>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">
                    <Button onClick={() => setShowLoginModal(true)}>
                      {" "}
                      Login
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">
                    {" "}
                    <Button onClick={() => setShowRejesterModal(true)}>
                      {" "}
                      Rejester
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Link to="/profile">
                    <img
                      src={
                        JSON.parse(localStorage.getItem("loginUser"))
                          ?.profile_image || "default-image-path.jpg" // Provide a fallback image if no profile image is found
                      }
                      alt=""
                      style={{
                        width: "3em",
                        height: "3em",
                        borderRadius: "100%",
                      }}
                    />
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">
                    {" "}
                    <Button onClick={handelLogout}> Logout</Button>
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Container>
        </Nav>
      </Container>
      <br />
      <br /> <br />
      <br />
    </>
  );
}
