import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useState } from "react";
import NavBar from "../NavigationBar/NavBar";
import { showError, showSuccess } from "../ToastService/ToastService";
import "./register.scss";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  // const showSuccess = (msg) => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success Message",
  //     detail: msg,
  //     life: 3000,
  //   });
  // };
  // const showError = (msg) => {
  //   toast.current.show({
  //     severity: "error",
  //     summary: "Error Message",
  //     detail: msg,
  //     life: 3000,
  //   });
  // };
  const registerHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let params = {
      name: name,
      username: username,
      email: email,
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
