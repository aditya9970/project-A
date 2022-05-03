import React from "react";
import Layout from "../Components/Layout";
import LoginComponent from "../Components/LoginComponent";

const LoginPage = () => {
  return (
    <Layout>
      <div className="container my-5">
        <h1>Login Page</h1>

        <LoginComponent />
      </div>
    </Layout>
  );
};

export default LoginPage;
