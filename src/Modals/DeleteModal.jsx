import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import CustomAlert from "../Components/Alerts/CustomAlert";
import { useOutletContext } from "react-router-dom";
export default function DeleteModal({ show, hideModal, setDeleted, postId }) {
  const [erroMessage, setErrorMessage] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const { token } = useOutletContext();
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setDeleted(true);

      setErrorMessage(undefined);
    } catch (err) {
      console.log("error", err);
      // setErrorMessage("error: " + err.res.data.message);
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handelDelete = () => {
    deletePost();
    hideModal();
  };
  const handelClose = () => {
    hideModal();
  };
  return (
    <>
      <Modal show={show} onHide={hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Conformation Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Suer Do You Want To Delete This Post</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelDelete}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomAlert
        variant={erroMessage ? "danger" : "success"}
        Message={erroMessage ? erroMessage : "Post Deleted Succssfuly"}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
}
