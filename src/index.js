import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GetSingleMoviePage from "./Pages/GetSingleMoviePage";
import GetReccomendedMoviesPage from "./Pages/GetReccomendedMoviesPage";
import UserReviewPage from "./Pages/UserReviewPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserReviewPage />} />
        <Route path="/movies/*" element={<GetSingleMoviePage />} />
        <Route path="/movies/" element={<GetReccomendedMoviesPage />} />
        <Route path="/" element={<Navigate to="/movies" />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
