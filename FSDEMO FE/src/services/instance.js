import axios from "axios";

const instance = axios.create({
  baseURL: "https://guvi-capstone-project-backend.onrender.com/api/v1",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
