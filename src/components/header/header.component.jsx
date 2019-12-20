import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/fashionC.svg";

import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo classNam="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>

      <Link className="option" to="/shop">
        CONTACT
      </Link>
    </div>
  </div>
);

export default Header;
