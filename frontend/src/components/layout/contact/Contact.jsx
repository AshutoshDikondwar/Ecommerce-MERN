import React from "react";
import "./contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ashutoshdikondwar@gmail.com">
        <Button>Contact: ashutoshdikondwar@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;