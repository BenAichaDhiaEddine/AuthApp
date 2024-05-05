import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Grid, TextField, Button } from "@mui/material";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const {
    login,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await login(email, password);
      navigate("/SuccessPage");
    } catch (error) {
      console.error("signin error:", error);
      setIsSubmitting(false);
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.message || "Bad request");
        } else {
          setErrorMessage(
            "An unexpected network error occurred. Please try again later."
          );
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Grid container spacing={2}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800">Sign In</h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-6">
                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="mb-6">
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  margin="normal"
                  fullWidth
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign In"}
              </Button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    </div>
  );
}

export default Signin;
