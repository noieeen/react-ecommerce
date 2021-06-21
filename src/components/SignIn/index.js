import React, { Component } from "react";
import "./style.scss";

import Buttons from "../forms/Button";

import { signinWithGoogle } from "../../firebase/utils";

class SignIn extends Component {

    handleSubmit = async e =>{
        e.preventDefault()
    }

  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>LogIn</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignin">
                <Buttons onClick={signinWithGoogle}>
                  Sign in with Google
                </Buttons>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
