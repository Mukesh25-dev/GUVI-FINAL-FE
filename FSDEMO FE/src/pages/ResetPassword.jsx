// // src/pages/ResetPassword.jsx
// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import instance from "../services/instance";

// const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState("");
//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await instance.post("/auth/reset-password", {
//         token,
//         email,
//         newPassword,
//       });
//       toast.success(response.data.message);
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form
//         className="bg-white p-8 shadow-md rounded-xl"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
//         <input
//           type="password"
//           placeholder="Enter your new password"
//           className="w-full p-3 border rounded mb-4"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
