import React, { use, useEffect, useState } from "react";
import { Container, Stack, Button, Card } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import "../../GlobalStyle.css";
import "./Home.css";
// import "../../Components/Post/Post.css";
import "../../Components/Post/post.css";
import axios from "axios";
import CustomSpinner from "../../Components/Snippers/CustomSpinner";
import "bootstrap-icons/font/bootstrap-icons.css";
import AddUpdatePostModal from "../../Modals/AddUpdatePostModal";
import Post from "../../Components/Post/Post";
import CustomAlert from "../../Components/Alerts/CustomAlert";
import ConformationModal from "../../Modals/DeleteModal";
export default function Home() {
  const { token, user } = useOutletContext();
  const [post, setPosts] = useState();
  const [loading, setloading] = useState();
  const [hover, setHover] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const handelAddUpdateModal = (p = null) => {
    setShowAddUpdate(true);
    if (p) {
      setUpdatePost(p);
    } else setUpdatePost(null);
  };
  const [AddButtonClass, setAddButtonClass] = useState();
  useEffect(() => {
    setAddButtonClass(
      token
        ? hover
          ? "bi bi-plus-circle-fill p-1 m-0 shadow-lg trans-3 "
          : "bi bi-plus-circle p-0 m-0 shadow-lg  trans-2 "
        : "d-none"
    );
  }, [token, hover]);

  useEffect(() => {
    setloading(true);
    const getPosts = async () => {
      try {
        const respons = await axios.get(
          "https://tarmeezacademy.com/api/v1/posts"
        );

        setPosts(respons.data.data);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    getPosts();
  }, [showAddUpdate, deleted]);

  let PostElement = (
    <Container id="PostsContainer">
      {(post || []).map((p) => {
        return (
          <Post
            key={p.id}
            post={p}
            handelAddUpdateModal={handelAddUpdateModal}
            setDeleted={setDeleted}
          />
        );
      })}
    </Container>
  );

  return (
    <>
      {" "}
      <CustomSpinner show={loading} />
      {PostElement}
      <AddUpdatePostModal
        setHover={setHover}
        AddButtonClass={AddButtonClass}
        handelAddUpdateModal={handelAddUpdateModal}
        showModel={showAddUpdate}
        setShowModal={setShowAddUpdate}
        post={updatePost}
      />
    </>
  );
}
