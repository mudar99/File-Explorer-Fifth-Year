import React from "react";
import "./navbar.scss";

const NavBar = () => {
  return (
    <nav className="navBar">
      <ul className="list">
        <a href="/#" className="logo">
          File Explorer
        </a>
        <a href="/" className="item">
          Register
        </a>
        <a href="/login" className="item">
          Login
        </a>
      </ul>
    </nav>
  );
};

export default NavBar;
