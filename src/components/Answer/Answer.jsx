import React from "react";
import { BiUserCircle } from "react-icons/bi";

const Answer = ({ answer, username }) => {
  return (
    <div>
      <hr />
      <div className="di d-flex align-items-center justify-space-between">
        <div className="flex-md-column">
          <BiUserCircle className="user" />
          <h6 className="ms-2 ms-md-0 d-flex justify-content-center align-items-center">
            {username}
          </h6>
        </div>
        <div className="ms-2 ms-md-5 answer">
          <p className="pt-2 pt-md-0">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
