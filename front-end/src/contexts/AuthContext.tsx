import React, { createContext, useState } from "react";
import { signInApi } from "../api/signInApi";
import { signupApi } from "../api/signupApi";

export interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  name?: string | undefined;
  setName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const success = await signInApi(email, password);
      if (success) {
        setIsLoggedIn(true);
        setEmail(email);
        setErrorMessage("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("SignIn error");
      }
      throw error;
    }
  };

  const signup = async (
    email: string,
    name: string,
    password: string
  ): Promise<void> => {
    try {
      const success = await signupApi(email, name, password);
      if (success) {
        setIsLoggedIn(true);
        setEmail(email);
        setName(name);
        setErrorMessage("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Signup error");
      }
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setName("");
    setErrorMessage("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        login,
        signup,
        logout,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
