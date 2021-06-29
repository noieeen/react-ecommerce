import React, { Component } from "react";
import "./style.scss";

import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import AuthWrapper from "../AuthWrapper";

import { auth, handleUserProfile } from "../../firebase/utils";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handelChange = this.handelChange.bind(this);
  }

  handelChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ["Password don't match."];
      this.setState({
        errors: err,
      });
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState,
      });
    } catch (err) {
      //console.log('handelSubmit >',err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    const configAuthWrapper = {
      headline: "Registration",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>

        <div className="formWrap">

          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}

          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Display Name"
              onChange={this.handelChange}
            />

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handelChange}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handelChange}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={this.handelChange}
            />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignUp;
