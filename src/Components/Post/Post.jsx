import React, { useEffect, useState } from "react";
import { Card, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserImage from "../../assets/Images/defaultuser.png";
import { useOutletContext } from "react-router-dom";
import defaultImage from "../../assets/Images/defaultuser.png";
import ConformationModal from "../../Modals/DeleteModal";
import axios from "axios";
import CustomAlert from "../Alerts/CustomAlert";
import CustomSpinner from "../Snippers/CustomSpinner";
import DeleteModal from "../../Modals/DeleteModal";
export default function Post({ post, handelAddUpdateModal, setDeleted }) {
  const { token, user } = useOutletContext();
  const {
    profile_image,
    username,
    id: userid,
  } = post?.author || { profile_image: defaultImage, username: "", id: 0 };

  //DeleteModal({ show, hideModal, deleted, postId })
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <Card className="post my-5 mx-0 shadow-lg">
      <Stack
        className="PostHeader border-bottom  border-1 justify-content-between"
        direction="horizontal"
      >
        <Stack direction="horizontal" gap={2}>
          <Link
            to={`/${userid}`}
            id="userLink"
            className="d-flex gap-1   align-items-center  text-decoration-none"
          >
            <img
              style={{
                width: "3vw",
                height: "3vw",
              }}
              src={
                // Object.keys(profile_image).length > 0
                //   ? profile_image
                //   : UserImage
                profile_image
              }
            ></img>
            <b>{username}</b>
          </Link>
        </Stack>

        {token && user?.id == userid && (
          <Stack gap={2} direction="horizontal">
            <br />
            <Button
              className="d-flex"
              variant="primary"
              onClick={() => handelAddUpdateModal(post)}
            >
              {" "}
              Update
            </Button>
            <Button
              className="d-flex"
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </Stack>
        )}
      </Stack>
      <hr />

      <Card.Img
        variant="top"
        src={post?.image}
        className="PostImage custom-card-img px-2    "
      />
      <Stack className="PostFooter  border-bottom mx-auto  ">
        <Card.Body>
          <Card.Title>
            {" "}
            <h4>{post?.title}</h4>{" "}
          </Card.Title>
          <Card.Text>{post?.body}</Card.Text>
        </Card.Body>
      </Stack>
      <Link
        to={handelAddUpdateModal && `Comments/${post?.id}`}
        className="m-2 text-decoration-none"
      >
        <b> Comments({post?.comments_count})</b>
      </Link>
      <DeleteModal
        // { show, hideModal, setDeleted, postId }
        show={showDeleteModal}
        hideModal={setShowDeleteModal}
        setDeleted={setDeleted}
        postId={post.id}
      />
    </Card>
  );
}
