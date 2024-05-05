import axios from "axios";

export const signInApi = async (email: string, password: string) => {
  const url = `http://localhost:3001/auth/signin`;
  const response = await axios.post(url, {
    email,
    password,
  });
  if (response.status === 201) {
    return true;
  } else {
    return response.data?.message || "Signup failed!";
  }
};
