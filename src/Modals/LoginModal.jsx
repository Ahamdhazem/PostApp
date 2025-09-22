import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import CustomAlert from "../Components/Alerts/CustomAlert";
import CustomSpinner from "../Components/Snippers/CustomSpinner";
export default function LoginModal({
  showModel,
  SaveAndClose,
  setToken,
  setUser,
}) {
  const [loding, setLoding] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [body, setbody] = useState({
    username: "Ahmadjjrtx",
    password: "123456",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const handelbodyChange = (e) => {
    const { name, value } = e.target;
    setbody({ ...body, [name]: value });
  };
  const login = async () => {
    setLoding(true);
    try {
      const res = await axios.post(
        "https://tarmeezacademy.com/api/v1/login",
        body, // <-- JSON body
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("body", body);
      console.log("respons", res.data);
      console.log("token:", res.data.token);
      console.log("User:", res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoding(false);
      setShowAlert(true);
      setTimeout(() => {
        SaveAndClose(false);
      }, 1000);
    }
  };
  return (
    <Modal show={showModel} onHide={SaveAndClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="UserName.ControlInput1">
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              name="username"
              type="text"
              autoFocus
              value={body.username}
              onChange={handelbodyChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password.ControlInput1">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name="password"
              value={body.password}
              type="password"
              rows={3}
              onChange={handelbodyChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={SaveAndClose}>
          Close
        </Button>
        <Button variant="primary" onClick={login}>
          Save Changes
        </Button>
      </Modal.Footer>
      <CustomAlert
        variant={errorMessage ? "danger" : "success"}
        Message={
          errorMessage ? `error: ${errorMessage}` : "User Login  SuccessFuly"
        }
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <CustomSpinner show={loding} />
    </Modal>
  );
}
