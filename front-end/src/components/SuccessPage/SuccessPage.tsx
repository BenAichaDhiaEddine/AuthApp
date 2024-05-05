import React from "react";
import "./styles.scss"; // Import SCSS file

const SuccessPage: React.FC = () => {
  return (
    <div className="successPage">
      <div className="contentContainer">
        <h1 className="title">Welcome Back!</h1>
        <p className="message">It's the end.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
