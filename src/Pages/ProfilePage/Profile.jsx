import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CustomSpinner from "../../Components/Snippers/CustomSpinner";
import { Container, Stack } from "react-bootstrap";
import dfultProfileImage from "../../assets/Images/defaultuser.png";
import Post from "../../Components/Post/Post";
import AddPostButton from "../../Components/AddPostButton/AddPostButton";
import AddUpdatePostModal from "../../Modals/AddUpdatePostModal";
export default function Profile() {
  const { userid } = useParams();
  const [loding, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  // const [token, setToken] = useState();
  const { token, user } = useOutletContext();

  const [posts, setPosts] = useState();
  const [PostElement, setPostElement] = useState("");
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState(null);

  const [hover, setHover] = useState(false);
  const [AddButtonClass, setAddButtonClass] = useState(false);

  const [showModel, setShowModel] = useState(false);
  const [deleted, setDeleted] = useState();
  // const [post, setPost] = useState(false);
  const handelAddUpdateModal = (p = null) => {
    setShowAddUpdate(true);
    if (p) {
      setUpdatePost(p);
    } else setUpdatePost(null);
  };

  useEffect(() => {
    setPostElement(
      <Container id="PostsContainer">
        {posts
          ?.slice()
          .reverse()
          .map((p) => {
            //Post.jsx
            // { post, token, loginUser, handelAddUpdateModal }

            return (
              <Post
                key={p?.id}
                post={p}
                handelAddUpdateModal={handelAddUpdateModal}
                setDeleted={setDeleted}
              />
            );
          })}
      </Container>
    );
  }, [posts]);
  // useEffect(() => {}, [userid]);
  useEffect(() => {
    setAddButtonClass(
      userid == user?.id
        ? hover
          ? "bi bi-plus-circle-fill p-1 m-0 shadow-lg trans-3 "
          : "bi bi-plus-circle p-0 m-0 shadow-lg  trans-2 "
        : "d-none"
    );
    setLoading(true);
    const getUser = async () => {
      setLoading(true);

      try {
        const respons = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${userid}`
        );

        setCurrentUser(respons.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        // setLoading(false);
      }
    };
    setLoading(true);
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const respons = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${userid}/posts`
          // https://tarmeezacademy.com/api/v1/users/1/posts
          //  https://tarmeezacademy.com/api/v1/users/1/posts
        );

        setPosts(respons.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
    getUserPosts();
    console.log(posts);

    console.log("posts", posts);
  }, [userid, showAddUpdate, token, user, deleted]);

  return (
    <>
      <CustomSpinner show={loding} />
      <Container className="mt-5">
        <Container className="d-flex align-items-center  justify-content-around gap-3">
          <img
            className=" rounded-circle  align-self-center"
            style={{
              width: "15vw",
              height: "15vw",
            }}
            src={
              currentUser
                ? Object.keys(currentUser?.profile_image).length > 0
                  ? currentUser?.profile_image
                  : dfultProfileImage
                : dfultProfileImage

              // currentUser?.profile_image || dfultProfileImage
            }
          />
          <Stack className="align-self-center ">
            <h4> Name: {currentUser?.name}</h4>
            <h4> UserName: {currentUser?.username}</h4>
          </Stack>
          <Stack className="align-self-center">
            <h4>Posts Count: {currentUser?.posts_count}</h4>
            <h4>Comment Count: {currentUser?.comments_count}</h4>
          </Stack>
        </Container>

        <Container>{PostElement && PostElement} </Container>

        <AddUpdatePostModal
          setHover={setHover}
          AddButtonClass={AddButtonClass}
          handelAddUpdateModal={handelAddUpdateModal}
          showModel={showAddUpdate}
          setShowModal={setShowAddUpdate}
          post={updatePost}
        />
      </Container>
    </>
  );
}
