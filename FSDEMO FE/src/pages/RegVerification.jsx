import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  setEmail,
} from "../../redux/features/auth/registerverificationSlice";
import { toast } from "react-toastify";
import instance from "../services/instance";

const RegVerification = () => {
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/auth/complete-registration", {
        email,
      });

      if (response.status === 200) {
        toast.success(response.data.message);

        dispatch(setEmail(""));

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Verfication
        </h1>
        <form className="space-y-5" onSubmit={handleRegister}>
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Complete-Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegVerification;
