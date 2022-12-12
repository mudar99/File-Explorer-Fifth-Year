import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const NavBar = (props) => {
  const logOutHandler = () => {
    localStorage.setItem('token','')
  };
  return (
    <nav className="navBar">
      <ul className="list">
        <a href="/mainpage" className="logo">
          File Explorer
        </a>
        {props.location === "mainPage" && (
          <>
            <Link className="link" to="/log">
              Logs <i className="icon pi pi-history"></i>
            </Link>
            <Link className="link" to="/reports">
              Reports <i className="icon pi pi-info-circle"></i>
            </Link>
            <Link className="link" to="/login" onClick={logOutHandler}>
              Logout <i className="icon pi pi-sign-out"></i>
            </Link>
          </>
        )}
        {props.location === "reports" && (
          <Link className="link" to="/mainpage">
            <i className="pi pi-arrow-left m-1"></i>
          </Link>
        )}
        {props.location === "logs" && (
          <Link className="link" to="/mainpage">
            <i className="pi pi-arrow-left m-1"></i>
          </Link>
        )}
        {props.location === "register" && (
          <>
            <Link className="link" to="/login">
              Login
            </Link>
          </>
        )}
        {props.location === "login" && (
          <>
            <Link className="link" to="/">
              Register
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
