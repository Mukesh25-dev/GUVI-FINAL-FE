const authLoader = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await authServices.me();
    return response.data;
  } catch (error) {
    console.error("Failed to load user profile:", error.message);
    return null;
  }
};

export default authLoader;
