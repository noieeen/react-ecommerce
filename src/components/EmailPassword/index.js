import React, { useState } from "react";
import "./style.scss";
import { withRouter } from "react-router";

import AuthWrapper from "../AuthWrapper";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import { auth } from "../../firebase/utils";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const resetForm = () => {
    setEmail("");
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetForm();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again."];
          setErrors(err);
        });
    } catch (err) {
       //console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Forgot Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Buttons>Reset Password</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
