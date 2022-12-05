import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const NavBar = (props) => {
  return (
    <nav className="navBar">
      <ul className="list">
        <a href="/#" className="logo">
          File Explorer
        </a>
        {props.location === "mainPage" ? (
          <>
            <Link className="link" to="/log">
              Logs <i className="icon pi pi-history"></i>
            </Link>
            <a href="/login" className="item">
              Logout <i className="icon pi pi-sign-out"></i>
            </a>
          </>
        ) : (
          <>
            <Link className="link" to="/">
              Register
            </Link>
            <Link className="link" to="/login">
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
