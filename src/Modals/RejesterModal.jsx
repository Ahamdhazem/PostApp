import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import CustomAlert from "../Components/Alerts/CustomAlert";
import CustomSpinner from "../Components/Snippers/CustomSpinner";
export default function RejesterModal({ showModel, SaveAndClose,setToken,setUser }) {
  const [loding, setLoding] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState({
    username: "Ahmadasdfasd",
    name: "aaa",
    password: "123456",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const handelFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] }); // store file
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const rejester = async () => {
    setLoding(true);
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("name", form.name);

    formData.append("password", form.password);
    if (form.image) {
      formData.append("image", form.image);
    }
    try {
      const res = await axios.post(
        "https://tarmeezacademy.com/api/v1/register",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("token:", res.data.token);
      console.log("User:", res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setErrorMessage(null);
      setShowAlert(true);
      setTimeout(() => {
        SaveAndClose(false);
        setShowAlert(false);
      }, 2000);
    } catch (err) {
      console.log("data", form);
      console.log("error", err?.response?.data?.message);
      setErrorMessage(err?.response?.data?.message);
      setShowAlert(true);
    } finally {
      setLoding(false);
      setToken(localStorage.getItem("token"));
      setUser(JASON.pars(localStorage.getItem("user")));
    }
  };

  return (
    // 'sm' | 'lg' | 'xl'
    <>
      <Modal
        show={showModel}
        onHide={SaveAndClose}
        className="top-20"
        style={{ zIndex: "10000" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rejesteration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile Image:</Form.Label>
              <Form.Control
                name="image"
                onChange={handelFormChange}
                type="file"
                // png, jpeg, jpg.
                accept="image/png, image/jpeg, image/jpg"
                autoFocus
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handelFormChange}
                type="text"
                placeholder="Your Name"
                autoFocus
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name:</Form.Label>
              <Form.Control
                name="username"
                value={form.username}
                onChange={handelFormChange}
                type="text"
                placeholder="User Name"
                autoFocus
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Passwrod:</Form.Label>
              <Form.Control
                name="password"
                value={form.password}
                onChange={handelFormChange}
                type="password"
                placeholder="password Length at leas 6 char"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={SaveAndClose}>
            Close
          </Button>
          <Button variant="primary" onClick={rejester}>
            Save Changes
          </Button>
        </Modal.Footer>
        <CustomAlert
          variant={errorMessage ? "danger" : "success"}
          Message={
            errorMessage
              ? `error: ${errorMessage}`
              : "User Rejester SuccessFuly"
          }
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
        <CustomSpinner show={loding} />
      </Modal>
    </>
  );
}
