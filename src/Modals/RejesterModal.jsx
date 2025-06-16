import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function RejesterModal({ show, closeModal, setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const DefaltInfo = {
    username: "Ahmad_joker30033350",
    password: "Ahmad_joker30033350",
    image: null,
    name: "Ahmad",
    email: "Ahmad_joker30033350@gmil.com",
  };
  const [rejesterInfo, setRejesterInfo] = useState(DefaltInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //console.log(rejesterInfo)

  //   --header 'Accept: application/json' \
  // --form 'username="yarob"' \
  // --form 'password="123456"' \
  // --form 'name="Yarob"' \
  // --form 'email="yarob.hm@gmail.com"'
  const form = new FormData();

  const ResjesterUser = async () => {
    try {
      form.append("username", rejesterInfo.username);
      form.append("password", rejesterInfo.password);
      form.append("name", rejesterInfo.name);
      form.append("email", rejesterInfo.email);
      if (rejesterInfo.image !== null) {
        const image = rejesterInfo.image;
        form.append("image", image);
      }
      setLoading(true);
      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/register",
        form,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.user);
      console.log(response.data.token);
      localStorage.setItem("loginUser", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      console.log(localStorage.getItem("user"));
      console.log(localStorage.getItem("token"));
      setError(null);
      setIsLogin(true);
    } catch (err) {
      if (err.response) {
        console.error("API Error:", err.response.data); // Log exact issue
      } else {
        console.error("Request Error:", err);
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // const [rejesterInfo, setRejesterInfo] = useState(DefaltInfo);

  //console.log(Object.values(rejesterInfo).includes(""));
  let enableButton = !Object.values(rejesterInfo).includes("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handelSaveRejesterUser = () => {
    ResjesterUser();
    closeModal();
  };
  console.log(JSON.parse(localStorage.getItem("loginUser")));
  return (
    <div>
      <Modal
        style={{ position: "absolute", zIndex: "10000" }}
        show={show}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User name</Form.Label>
              <Form.Control
                value={rejesterInfo.username}
                onChange={(e) => {
                  setRejesterInfo({
                    ...rejesterInfo,
                    username: e.target.value,
                  });
                }}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={rejesterInfo.password}
                onChange={(e) => {
                  setRejesterInfo({
                    ...rejesterInfo,
                    password: e.target.value,
                  });
                  console.log(rejesterInfo.password);
                }}
                type={showPassword ? "text" : "password"}
                autoFocus
                style={{ marginRight: "10px" }}
              />
              <div
                className="mt-2"
                style={{
                  display: "flex",
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
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={(e) => {
                  // Handle file input
                  setRejesterInfo({
                    ...rejesterInfo,
                    image: e.target.files[0], // Store the selected file object
                  });
                  console.log(rejesterInfo.image);
                }}
                type="file"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={rejesterInfo.name}
                onChange={(e) => {
                  setRejesterInfo({
                    ...rejesterInfo,
                    name: e.target.value,
                  });
                  //        console.log(rejesterInfo.name);
                }}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={rejesterInfo.email}
                onChange={(e) => {
                  setRejesterInfo({
                    ...rejesterInfo,
                    email: e.target.value,
                  });
                }}
                type="email"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant={enableButton ? "primary" : "secondary"}
            onClick={handelSaveRejesterUser}
            disabled={!enableButton}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
