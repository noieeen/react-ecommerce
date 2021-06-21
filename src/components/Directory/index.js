import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

import ShopMen from "./../../assets/men.jpg";
import ShopWomen from "./../../assets/women.jpg";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <Link to="">Shop Womens</Link>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <Link to="">Shop Men</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
