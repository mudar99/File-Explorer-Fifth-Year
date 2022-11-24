import React, { useRef } from "react";
import "./login.scss";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { showError, showSuccess } from "../ToastService/ToastService";
import { useState } from "react";
import NavBar from "../NavigationBar/NavBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let params = {
      username: username,
      password: password,
    };
    setTimeout(() => {
      setLoading(false);
      showSuccess("Done With Success", toast);
      showError("Failed", toast);
    }, 1000);
  };
  return (
    <>
      <Toast ref={toast} />
      <NavBar />
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
