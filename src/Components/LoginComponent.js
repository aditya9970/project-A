import React, { useState } from "react";
import { login } from "../api/auth";

const LoginComponent = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    console.log(e);
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginInfo)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => handleChange(e)}
            class="form-control"
            value={loginInfo.email}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            value={loginInfo.password}
          />
        </div>

        <button type="submit" class="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
