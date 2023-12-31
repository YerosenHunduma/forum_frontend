import React from "react";
import "./Question.css";
import { BiUserCircle } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";

function Question({ question, username }) {
  return (
    <div className=" di d-flex align-items-center justify-space-between">
      <div className=" flex-md-column avatar-container">
        <BiUserCircle className="user" />
        <h6 className="align-self-center ms-2 ms-md-0 text-center">
          {username}
        </h6>
      </div>
      <div className="ms-5 flex-grow-1 d-flex ">
        <h6 className="pt-2 pt-md-0">{question}</h6>
      </div>
      <div className="d-none d-md-block ms-md-5">
        <FaAngleRight className="fa" />
      </div>
    </div>
  );
}

export default Question;
