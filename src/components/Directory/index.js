import React from "react";
import "./style.scss";

import ShopMen from "./../../assets/men.jpg";
import ShopWomen from "./../../assets/women.jpg";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a href="#">Shop Womens</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <a href="#">Shop Men</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
