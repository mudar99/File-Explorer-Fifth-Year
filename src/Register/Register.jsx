import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useState } from "react";
import NavBar from "../NavigationBar/NavBar";
import { showError, showSuccess } from "../ToastService/ToastService";
import { registerPost } from "../API";
import "./register.scss";
import axios from "axios";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  const registerHandler = (e) => {
    e.preventDefault();
    let registerParams = new FormData();
    setLoading(true);
    registerParams.append("fullName", name);
    registerParams.append("username", username);
    registerParams.append("password", password);
    registerParams.append("email", email);
    axios
      .post(registerPost, registerParams)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          setLoading(false);
          showSuccess(res.data.message, toast);
          setTimeout(function () {
            localStorage.setItem("token", res.data.data.accessToken);
            window.location.href = "/MainPage";
          }, 1000);
        } else {
          setLoading(false);
          showError(res.data.message, toast);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <NavBar />
      <div className="register-container container rounded">
        <div className="text-center mb-3 border-bottom">
          <h2 className="title">Register</h2>
        </div>
        <form onSubmit={registerHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
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
            <Button label="Register" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
