import React from "react";
import "./style.scss";

const Buttons = ({ children, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  );
};

export default Buttons;
