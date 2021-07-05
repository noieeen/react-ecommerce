import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser,signInWithGoogle,resetAllAuthForms } from "../../redux/Users/user.actions";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import AuthWrapper from "../AuthWrapper";


const mapState = ({ user }) => ({ signInSuccess: user.signInSuccess });

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () =>{
    dispatch(signInWithGoogle);
  }

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
            <Buttons onClick={handleGoogleSignIn}>Sign in with Google</Buttons>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
