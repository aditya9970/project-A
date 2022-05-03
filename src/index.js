import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetSingleMoviePage from "./Pages/GetSingleMoviePage";
import GettingStartedPage from "./Pages/GettingStartedPage";
import GetReccomendedMoviesPage from "./Pages/GetReccomendedMoviesPage";
import LoginPage from "./Pages/LoginPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gettingstarted" element={<GettingStartedPage />} />
        <Route path="/movies/*" element={<GetSingleMoviePage />} />
        <Route path="/movies/" element={<GetReccomendedMoviesPage />} />
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
