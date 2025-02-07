// // src/pages/RequestPasswordReset.jsx
// import { useState } from "react";
// import { toast } from "react-toastify";
// import instance from "../services/instance";

// const RequestPasswordReset = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await instance.post("/auth/request-password-reset", {
//         email,
//       });
//       toast.success(response.data.message);
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
//         <h2 className="text-2xl font-bold mb-4">Request Password Reset</h2>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full p-3 border rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RequestPasswordReset;
