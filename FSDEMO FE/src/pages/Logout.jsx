import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import instance from "../services/instance";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/auth/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      const response = await instance.post("/auth/logout");
      if (response.status === 200) {
        toast.success(response.data.message);

        dispatch(clearUser());

        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    logoutUser();
  }, []);
  return <div>Logging out....</div>;
};

export default Logout;
