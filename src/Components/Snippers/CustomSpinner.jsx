import React from "react";
import { Spinner } from "react-bootstrap";
export default function CustomSpinner({ show }) {
  return (
    show && (
      <>
        {" "}
        <Spinner
          style={{ width: "4rem", height: "4rem" }}
          className=" position-fixed top-50 start-50 z-3  "
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    )
  );
}
