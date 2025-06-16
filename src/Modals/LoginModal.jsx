import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
export default function LoginModal({ show, handleClose, setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [LoginInfo, setLoginInfo] = useState({
    username: "Ahmad_joker30033350",
    password: "Ahmad_joker30033350",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const LoginUser = () => {
    const Headers = { Accept: "application/json" };
    axios
      .post("https://tarmeezacademy.com/api/v1/login", LoginInfo, { Headers })
      .then((response) => {
        localStorage.setItem("loginUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        console.log(localStorage.getItem("loginUser"));
        console.log(localStorage.getItem("token"));
        setIsLogin(true);
      })
      .catch((err) => {
        if (err.response) {
          console.error("API Error:", err.response.data);
        } else {
          console.error("Request Error:", err);
        }
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handelLogin = () => {
    LoginUser();
    handleClose();
  };
  return (
    <div>
      <Modal
        style={{ position: "absolute", zIndex: "10000" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                value={LoginInfo.username}
                onChange={(e) =>
                  setLoginInfo({ ...LoginInfo, username: e.target.value })
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                autoFocus
                style={{ marginRight: "10px" }}
                value={LoginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...LoginInfo, password: e.target.value })
                }
              />
              <div
                className="mt-2"
                style={{
                  display: "Flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelLogin}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
