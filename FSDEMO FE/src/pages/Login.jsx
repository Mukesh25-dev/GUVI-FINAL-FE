import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from "../../redux/features/auth/loginSlice";
import instance from "../services/instance";
import authServices from "../services/authServices";
import { setUser } from "../../redux/features/auth/userSlice";

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform login and retrieve token
      const response = await instance.post("/auth/login", { email, password });

      if (response.status === 200) {
        toast.success("Login Successful!");

        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        // Fetch user profile with token
        const profileResponse = await authServices.me(token);

        // Update Redux store with user data
        dispatch(setUser(profileResponse.data));

        // Clear form fields
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        // Navigate after a short delay
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Login
        </h1>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-indigo-500 hover:underline"
            >
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
