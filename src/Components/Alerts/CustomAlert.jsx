import React from "react";
import Alert from "react-bootstrap/Alert";
import Closeicon from "../../assets/Images/x-circle.svg";
export default function CustomAlert({
  variant,
  Message,
  showAlert,
  setShowAlert,
}) {
  // console.log("Alert Props", {
  //   variant,
  //   Message,
  //   showAlert,
  //   setShowAlert,
  // });
  return showAlert ? (
    <Alert
      className=""
      style={{
        position: "fixed",
        top: "80%",
        right: "2vw",

        padding: "0.5rem 1rem",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
      variant={variant}
    >
      {Message}
      <svg
        xmlns={Closeicon}
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-circle"
        viewBox="0 0 16 16"
        onClick={() => {
          setShowAlert(false);
        }}
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
      {showAlert}
    </Alert>
  ) : (
    <></>
  );
}
