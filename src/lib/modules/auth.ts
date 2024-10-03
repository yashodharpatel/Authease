import axios from "axios";
import { getConfig } from "../config";

const signup = async (
  fullname: string,
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const { owner, projectAssigned } = getConfig();
  try {
    const response = await axios.post("http://localhost:8080/auth/register", {
      fullname,
      username,
      email,
      password,
      owner,
      projectAssigned,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export { signup };
