import React, { useEffect, useState } from "react";
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

export default function Home() {
  const { token, user } = useOutletContext();
  const [post, setPosts] = useState();
  const [loading, setloading] = useState();
  const [hover, setHover] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState(null);

  const handelAddUpdateModal = (p = null) => {
    setShowAddUpdate(true);
    if (p) {
      setUpdatePost(p);
    } else setUpdatePost(null);
  };
  useEffect(() => {}, [updatePost]);
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
  }, [showAddUpdate]);

  let PostElement = (
    <Container id="PostsContainer">
      {(post || []).map((p) => {
        console.log(p);
        // console.log(user.id);
        const { profile_image, username, id: userid } = p.author;

        return (
          //  margin: 2rem 0;
          // <Card key={p?.id} className="post my-5 mx-0 shadow-lg">
          //   <Stack
          //     className="PostHeader border-bottom  border-1 justify-content-between"
          //     direction="horizontal"
          //   >
          //     <Stack direction="horizontal" gap={2}>
          //       <Link
          //         to={`/${userid}`}
          //         id="userLink"
          //         className="d-flex gap-1   align-items-center  text-decoration-none"
          //       >
          //         <img
          //           style={{
          //             width: "3vw",
          //             height: "3vw",
          //           }}
          //           src={
          //             Object.keys(profile_image).length > 0
          //               ? profile_image
          //               : UserImage
          //           }
          //         ></img>
          //         <b>{username}</b>
          //       </Link>
          //     </Stack>
          //     {token && user.id == p.author.id && (
          //       <Stack gap={2} direction="horizontal">
          //         <Button
          //           className="d-flex"
          //           variant="primary"
          //           onClick={() => handelAddUpdateModal(p)}
          //         >
          //           {" "}
          //           Update
          //         </Button>
          //         <Button className="d-flex" variant="danger">
          //           Delete
          //         </Button>
          //       </Stack>
          //     )}
          //   </Stack>
          //   {/* <hr /> */}

          //   <Card.Img
          //     variant="top"
          //     src={p.image}
          //     className="PostImage custom-card-img px-2    "
          //   />
          //   <Stack className="PostFooter  border-bottom mx-auto  ">
          //     <Card.Body>
          //       <Card.Title>
          //         {" "}
          //         <h4>{p.title}</h4>{" "}
          //       </Card.Title>
          //       <Card.Text>{p.body}</Card.Text>
          //     </Card.Body>
          //   </Stack>
          //   <Link to={"Comments"} className="m-2 text-decoration-none">
          //     <b> Comments({p.comments_count})</b>
          //   </Link>
          // </Card>

          <Post
            key={post?.id}
            post={p}
            // token={token}
            // loginUser={user?.id || -1}
            handelAddUpdateModal={handelAddUpdateModal}
          />
          // <Post
          //   id={p?.id}
          //   post={p}
          //   token={token}
          //   currentUserID={loginUser?.id || -1}
          // />
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
