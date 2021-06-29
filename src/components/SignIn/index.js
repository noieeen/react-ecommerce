import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import AuthWrapper from "../AuthWrapper";

import { signinWithGoogle, auth } from "../../firebase/utils";

const initialState = {
  email: "",
  password: "",
};
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      //   console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline :'login'
    }

    return (
      <AuthWrapper {...configAuthWrapper} >
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />

            <Buttons type="submit">Login</Buttons>

            <div className="socialSignin">
              <Buttons onClick={signinWithGoogle}>Sign in with Google</Buttons>
            </div>
            <div className="links">
              <Link to='/recovery'>
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignIn;
