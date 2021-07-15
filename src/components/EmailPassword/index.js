import React, { useState, useEffect } from "react";
import "./style.scss";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart, resetUserState} from "../../redux/Users/user.actions";

import AuthWrapper from "../AuthWrapper";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userError: user.userError,
});

const EmailPassword = (props) => {
  const { resetPasswordSuccess, userError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState())
      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setErrors(userError);
    }
  }, [userError]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));

    //resetForm();
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
