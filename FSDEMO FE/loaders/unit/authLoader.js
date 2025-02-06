import authServices from "../../src/services/authServices";

const authLoader = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Set the token in the Authorization header
    const response = await authServices.me(token);

    return response.data;
  } catch (error) {
    console.error("Failed to load user profile:", error.message);
    return null;
  }
};

export default authLoader;
