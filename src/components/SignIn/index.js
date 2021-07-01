import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import AuthWrapper from "../AuthWrapper";

import { signinWithGoogle, auth } from "../../firebase/utils";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      //   console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "login",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Buttons type="submit">Login</Buttons>

          <div className="socialSignin">
            <Buttons onClick={signinWithGoogle}>Sign in with Google</Buttons>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
