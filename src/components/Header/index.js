import React from "react";
import "./style.scss";

import { Link } from "react-router-dom";

import Logo from "./../../assets/logo.png";

const Header = (props) => {
  return (
    <header className="header">
      <div className="warp">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Shop" />
          </Link>
        </div>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
                Login
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
