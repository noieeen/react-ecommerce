import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import Logo from "./../../assets/logo.png";


import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from './../../redux/Users/user.actions'


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart())
  }

  return (
    <header className="header">
      <div className="warp">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Shop" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link onClick={() => signOut()}>Logout</Link>
              </li>
            </ul>
          )}



          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};



export default Header;