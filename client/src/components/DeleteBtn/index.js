import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn() {
  return (
    <span className="delete-btn" role="button" tabIndex="0">
      X
    </span>
  );
}

export default DeleteBtn;
