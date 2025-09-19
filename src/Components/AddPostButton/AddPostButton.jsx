import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AddPostButton({ setHover, AddButtonClass , handelAddUpdateModal }) {

  return (
    <Button
      onClick={handelAddUpdateModal}
      variant="link"
      title="Add New Post"
      style={{
        position: "fixed",
        top: "80%",
        left: "80%",
        fontSize: "2rem",

        backgroundColor: "transparent", // no background
        color: "#210ef2ff", // icon color
        // boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // shadow effect

        borderRadius: "50%",

        lineHeight: 1,
        cursor: "pointer",
        display: "inline-block",
      }}
      className={AddButtonClass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    ></Button>
  );
}
