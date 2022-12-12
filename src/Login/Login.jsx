import React, { useEffect, useRef } from "react";
import "./login.scss";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { showError, showSuccess } from "../ToastService/ToastService";
import { useState } from "react";
import NavBar from "../NavigationBar/NavBar";
import axios from "axios";
import { loginPost } from "../API";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/mainpage";
    }
  }, []);
  const loginHandler = (e) => {
    e.preventDefault();
    let loginParams = new FormData();
    setLoading(true);
    loginParams.append("username", username);
    loginParams.append("password", password);
    axios
      .post(loginPost, loginParams)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          setLoading(false);
          showSuccess(res.data.message, toast);
          setTimeout(function () {
            localStorage.setItem("token", res.data.data.accessToken);
            window.location.href = "/MainPage";
          }, 1000);
        }
      })
      .catch((err) => {
        console.error(err);
        showError(err.response.status, err.response.data.message, toast);
        setLoading(false);
      });
  };
  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <NavBar location="login" />
      <div className="login-container container rounded">
        <div className="text-center mb-3 border-bottom ">
          <h2 className="title">Login</h2>
        </div>
        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <Button label="Login" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
