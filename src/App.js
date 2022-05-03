import React from "react";
import Layout from "./Components/Layout";
import "./bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { CardComponent } from "./Components/MovieComponent";

const App = () => {
  return (
    <div className="bg-black">
      <Layout>This is home page</Layout>
    </div>
  );
};

export default App;
