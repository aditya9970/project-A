import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { googleLogin, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigator = useNavigate();

  const handleLogout = () => {
    logout()
      .then(({ data }) => {
        console.log(data);
        document.cookie = null;
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    localStorage.getItem("userId") ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const googleSucess = async (res) => {
    let result = res?.profileObj;
    let token = res?.tokenId;
    console.log(res);
    googleLogin({
      name: result.name,
      googleId: result.googleId,
      token: token,
    })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("userId", JSON.stringify(data.userId));
        setIsLoggedIn(true);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
  const googleFailure = () => {
    console.log("google failure");
  };

  return (
    <>
      {" "}
      {!isLoggedIn ? (
        <GoogleLogin
          onSuccess={googleSucess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
          clientId="1088001391296-lb4vdu3be6sigb6st5m6vgi4chl1m78d.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="btn btn-primary"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </button>
          )}
        />
      ) : (
        <button
          className="btn btn-outline-primary"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      )}
    </>
  );
};

export default LoginComponent;
