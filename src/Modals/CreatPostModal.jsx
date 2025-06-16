import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function CreatPostModal({ show, closeModal }) {
  const defaultPostInfo = {
    title: "",
    body: "",
    image: null,
  };
  const [CreatPostInfo, setCreatPostInfo] = useState(defaultPostInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let enableButton = !Object.values(defaultPostInfo).includes("");

  const handelCreatePost = () => {
    const form = new FormData();
    setLoading(true);
    form.append("title", CreatPostInfo.title);
    form.append("body", CreatPostInfo.body);
    form.append("id", uuidv4());
    if (CreatPostInfo.image !== null) form.append("image", CreatPostInfo.image);
    const headers = {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post("https://tarmeezacademy.com/api/v1/posts", form, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    closeModal();
  };
  return (
    <Container>
      <Modal
        className="  "
        style={{ position: "absolute", zIndex: "10000" }}
        show={show}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cearte Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={CreatPostInfo.title}
                onChange={(e) => {
                  setCreatPostInfo({
                    ...CreatPostInfo,
                    title: e.target.value,
                  });
                }}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>body</Form.Label>
              <Form.Control
                as="textarea"
                value={CreatPostInfo.body}
                onChange={(e) => {
                  setCreatPostInfo({
                    ...CreatPostInfo,
                    body: e.target.value,
                  });
                }}
                autoFocus
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCreatPostInfo({
                    ...CreatPostInfo,
                    image: e.target.files[0], // Store the selected file object
                  });
                }}
                type="file"
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
            // variant={enableButton ? "primary" : "secondary"}
            onClick={handelCreatePost}
            // disabled={enableButton}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
