import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import CustomAlert from "../Components/Alerts/CustomAlert";
import CustomSpinner from "../Components/Snippers/CustomSpinner";
import AddPostButton from "../Components/AddPostButton/AddPostButton";
export default function AddUpdatePostModal({
  setHover,
  AddButtonClass,
  handelAddUpdateModal,
  showModel,
  setShowModal,
  post,
}) {
  const [loding, setLoding] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [body, setbody] = useState(
    post?.id != null
      ? { title: post.title, body: post.body, image: post.image }
      : {}
  );

  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const [path, setPath] = useState();
  useEffect(() => {
    if (post && post.id) {
      setMessage("Post Updated Successfully");
    } else {
      setMessage("Post Added Successfully");
    }
    if (post?.id) {
      setbody({
        title: post.title || "",
        body: post.body || "",
        image: post.image || null,
      });
    } else {
      setbody({ title: "", body: "", image: null });
    }
    setPath(post?.image);
  }, [post, showModel]);

  const handelbodyChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        setbody({ ...body, image: file });
        setPath(URL.createObjectURL(file));
      }
    } else {
      setbody({ ...body, [name]: value });
    }
  };
  const AddPostRequest = "https://tarmeezacademy.com/api/v1/posts";
  const UpdatePostRequest = `https://tarmeezacademy.com/api/v1/posts/${post?.id}`;
  const CreateUpdatePost = async () => {
    setLoding(true);
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("body", body.body);
    if (body.image) {
      formData.append("image", body.image);
    }
    try {
      let res;

      if (post?.id) {
        formData.append("_method", "put");
        res = await axios.post(UpdatePostRequest, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
      } else {
        res = await axios.post(AddPostRequest, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
      }

      console.log("response:", res);
      console.log("body:", body);
      // setErrorMessage(null);
      setStatus(res.status);
    } catch (err) {
      console.log("data", body);
      console.log("error", err);
      setMessage("error: " + err.response.data.message);
    } finally {
      setLoding(false);
      setShowAlert(true);
      setShowModal(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <>
      <Modal show={showModel} onHide={setShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {post?.id ? "Update Post" : "Create A New Post"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Title.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                name="title"
                type="text"
                autoFocus
                value={body.title || ""}
                onChange={handelbodyChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="body.ControlInput1">
              <Form.Control
                name="body"
                value={body.body || ""}
                as="textarea"
                rows={3}
                onChange={handelbodyChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image.ControlInput1">
              <Form.Label>Image:</Form.Label>
              {body?.image && (
                <img
                  src={path}
                  alt="Current post"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              )}
              <Form.Control
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                rows={3}
                onChange={handelbodyChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateUpdatePost}>
            Save Changes
          </Button>
        </Modal.Footer>

        <CustomSpinner show={loding} />
      </Modal>
      <CustomAlert
        variant={status >= 200 && status <= 300 ? "success" : "danger"}
        Message={message}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <AddPostButton
        setHover={setHover}
        AddButtonClass={AddButtonClass}
        handelAddUpdateModal={handelAddUpdateModal}
      />
    </>
  );
}
