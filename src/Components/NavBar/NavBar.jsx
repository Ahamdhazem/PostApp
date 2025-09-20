import React, { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
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
      className="bg-primary p-2 shadow-lg"
      fluid="xl"
    >
      <Row className="justify-content-between">
        <Col xs={6}>
          <Stack
            className="d-none d-md-flex"
            gap={5}
            bg="primary"
            direction="horizontal"
            style={{ width: "70%" }}
          >
            <h1>PostApp</h1>
            <Link to={"/"}>
              {" "}
              <Button>Home</Button>{" "}
            </Link>
            <Link to={`/${user?.id}`}>
              {" "}
              <Button>Profile</Button>{" "}
            </Link>
          </Stack>
          {/* className="d-md-none" */}
          <Stack className="d-md-none">
            <h1>PostApp</h1>

            {token && (
              <Dropdown>
                <Dropdown.Toggle
                  id="post-actions-dropdown"
                  size="sm"
                  as="button"
                  className="btn btn-primary btn-sm"
                  bsPrefix="btn"
                >
                  <i class="bi bi-three-dots-vertical" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                  <Dropdown.Item>
                    <Link to={"/"}>
                      {" "}
                      <Button size="sm" variant="outline-primary">
                        Home
                      </Button>{" "}
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={`/${user?.id}`}>
                      {" "}
                      <Button size="sm" variant="outline-primary">
                        Profile
                      </Button>{" "}
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Stack>
        </Col>

        <Col
          xs={5}
          className=" d-flex flex-row-reverse
"
        >
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
              <Button
                onClick={logauot}
                variant="danger"
                className="d-none d-md-flex"
              >
                Logauto
              </Button>

              <Button
                className=" d-md-none"
                onClick={logauot}
                variant="danger"
                size="sm"
              >
                Logauto
              </Button>
            </Stack>
          ) : (
            <Stack direction="horizontal" className="RegesterAndLogin gap-3 ">
              <Button
                variant="primary"
                className="border border-1 d-none d-md-flex"
                onClick={() => setShowLogainModal(true)}
              >
                Login
              </Button>

              <Button
                onClick={() => setShowRejesterModal(true)}
                variant="secondary"
                className="border border-1 d-none d-md-flex"
              >
                Rejester
              </Button>

              <Button
                variant="primary"
                className="border border-1 d-md-none"
                onClick={() => setShowLogainModal(true)}
                size="sm"
              >
                Login
              </Button>

              <Button
                onClick={() => setShowRejesterModal(true)}
                variant="secondary"
                className="border border-1 d-md-none"
                size="sm"
              >
                Rejester
              </Button>
            </Stack>
          )}
        </Col>
      </Row>

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
