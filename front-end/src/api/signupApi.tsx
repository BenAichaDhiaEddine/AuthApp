import axios from "axios";

export const signupApi = async (
  email: string,
  name: string,
  password: string
) => {
  const response = await axios.post("http://localhost:3001/auth/signup", {
    email,
    name,
    password,
  });

  if (response.status === 201) {
    return true; 
  } else {
    return response.data?.message || "Signup failed!";
  }
};
