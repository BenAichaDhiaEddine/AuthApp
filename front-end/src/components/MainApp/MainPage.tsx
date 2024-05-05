import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./styles.scss";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="background-container"></div>
      <div className="content-wrapper">
        <h1>Welcome to our App!</h1>
        <p>
          This is our module that allows a user to sign up and sign in to the
          application.
        </p>
        <div className="button-container">
          <Link to="/signin" className="sign-in-button">
            <Button
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup" className="sign-up-button">
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 15 }}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
