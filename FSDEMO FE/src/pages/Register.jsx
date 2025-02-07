import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPassword,
  setEmail,
  setName,
  setPassword,
} from "../../redux/features/auth/registerSlice";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import instance from "../services/instance";

const Register = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Registration Successful!");

        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        //navigate the users to login
        navigate("/register-verification");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Register
        </h1>
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              required
            />
          </div>
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
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
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
              placeholder="Create a password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
