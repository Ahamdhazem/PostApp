import React, { useEffect, useState } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  InputGroup,
  Stack,
  Form,
  Spinner,
} from "react-bootstrap";
import Post from "../../Components/Post/Post";
import CustomSpinner from "../../Components/Snippers/CustomSpinner";
export default function Comments() {
  const { postID } = useParams();
  const { token } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [newComment, setNewComment] = useState();
  const getPost = async () => {
    setLoading(true);
    try {
      const respons = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts/${postID}`
      );
      setPost(respons.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [postID, token, newComment]);
  let CommentsElemetns = (
    <Container>
      {(post?.comments || [])
        ?.slice()
        .reverse()
        .map((comment) => {
          return (
            <Stack
              key={comment?.id}
              className="border px-3 rounded-5  pt-3 mb-3"
            >
              <Stack direction="horizontal" gap={2} className="mb-3">
                <img
                  style={{
                    width: "3vw",
                    height: "3vw",
                    borderRadius: "50%",
                  }}
                  src={comment?.author.profile_image}
                  alt=""
                />
                <h5>{comment.author.username}</h5>
              </Stack>
              <p>{comment.body} </p>
            </Stack>
          );
        })}
    </Container>
  );

  const AddNewComment = async () => {
    // alert("AddNewComment");
    setLoading(true);
    try {
      const respons = await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${postID}/comments`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setNewComment(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container fluid="md">
      <Post post={post} handelAddUpdateModal={null} />

      {token && (
        <Stack direction="horizontal" gap={2} className="pb-5">
          {/* <Labal htmlFor="">Add Comment</Labal>
        <input className="w-75" />
       <Button>Add</Button> */}
          <InputGroup>
            <InputGroup.Text>Add Comment</InputGroup.Text>
            <Form.Control
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button onClick={AddNewComment}>Add</Button>
        </Stack>
      )}
      {CommentsElemetns}
      <CustomSpinner show={loading} />
    </Container>
  );
}
