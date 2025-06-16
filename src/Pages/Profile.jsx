import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Posts from "../Posts";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CreatPostModal from "../Modals/CreatPostModal";
export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const handelcloseModal = () => {
    setShowModal(false);
  };
  const handelShowModal = () => {
    setShowModal(true);
  };
  return (
    <Container style={{ width: "100vw" }} className=" row mx-auto   ">
      <CreatPostModal show={showModal} closeModal={handelcloseModal} />
      <Container style={{ position: "relative", marginBottom: "10vh" }}>
        <img
          style={{
            width: "100%",
            height: "60vh",
            objectFit: "cover",
          }}
          src="https://wallpapers.com/images/high/profile-background-4yoef4rdwnf1ynie.webp"
          alt=""
        />
        <img
          style={{
            width: "7em",
            height: "7em",
            borderRadius: "100%",
            position: "absolute",
            zIndex: "1000",
            top: "80%",
            left: "80%",
          }}
          //   src={
          //     JSON.parse(localStorage.getItem("loginUser"))?.profile_image ||
          //     "default-image-path.jpg" // Provide a fallback image if no profile image is found
          //   }
          src="https://image.petmd.com/files/inline-images/2%20arabian%20horse.jpg?VersionId=40bEtJUxMMfuJVVzbSGcOCbSHJWzvrm9"
          alt=""
        />
      </Container>
      <Container
        className="bg-light mb-5 p-0 w-50  "
        style={{
          cursor: "pointer",
        }}
        onClick={handelShowModal}
      >
        <InputGroup className="p-0 ">
          <InputGroup.Text id="basic-addon1">
            {" "}
            whay are you tinking
          </InputGroup.Text>
          <Form.Control
            placeholder="Write some thing"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Container>
      <Container>
        <Posts />
      </Container>
    </Container>
  );
}
