import React from "react";
import "./style.scss";

const FormInput = ({ handleChange, label, ...otherPops }) => {
  return (
    <div className="formRow">
      {label && <label >{label}</label>}

      <input type="text" className="formInput" onChange={handleChange} {...otherPops} />
    </div>
  );
};

export default FormInput;
