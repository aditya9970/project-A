import React from "react";
import Layout from "../Components/Layout";
import UserReviewComponent from "../Components/UserReviewComponent";

const UserReviewPage = () => {
  return (
    <Layout>
      <div className="my-5 container">
        <h1>Your Review History</h1>
        <UserReviewComponent />
      </div>
    </Layout>
  );
};

export default UserReviewPage;
