import React from "react";
import { Container } from "react-bootstrap";
import "./Card.css";
export default function Post({ cardDetails }) {
  const { created_at, image, comments, body, comments_count, tags } =
    cardDetails;
  const { profile_image, username } = cardDetails.author;
  // console.log(created_at, image, comments, body, profile_image, username);
  const showTages = <></>;
  if (tags.length !== 0) {
    showTages = tags.map((t) => {
      <span className="tage" key={t.id}>
        <h6>{t}</h6>
      </span>;
    });
  }
  return (
    <Container
      id="CardContainer"
      className=" shadow mb-5 bg-white roun  p-0 align-items-center  pb-3  "
    >
      <Container
        id="UserName_Img"
        className="d-flex align-items-center mb-1 gap-3 "
      >
        {" "}
        <img
          src={profile_image}
          alt=""
          style={{ width: "2.5em", height: "2.5em", borderRadius: "100%" }}
        />
        <span> {username}</span>
      </Container>
      <Container id="PostImageContainer">
        <img
          src={image}
          alt=""
          style={{ width: "100%", maxHeight: "100vh", objectFit: "cover" }}
        />
      </Container>
      <Container>
        <span style={{ color: "#b0b6cbe0" }}>
          <b>{created_at} </b>{" "}
        </span>
        <h5>{body}</h5>
        <hr />

        <Container className="d-flex justify-content-left align-items-center">
          <h6>🖋️({comments_count})comment</h6>
          {showTages}
        </Container>
      </Container>
    </Container>
  );
}
