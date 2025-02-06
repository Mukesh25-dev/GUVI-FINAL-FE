import React, { useState } from "react";
import { toast } from "react-toastify";
import adminServices from "../../services/adminServices";

// In your frontend component
const AdCreateOrganiser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "organiser", // Default role as organiser
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // send plain password or handle hashing in the backend
      role: formData.role,
    };

    try {
      // Sending data as JSON, not FormData
      const response = await adminServices.createOrganiser(eventData); // Ensure adminServices sends data correctly
      console.log(response);
      toast.success(response.data.message || "Organiser created successfully!");
    } catch (error) {
      console.error("Error creating organiser:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create organiser.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Create Organiser
        </h1>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6} // Enforce minimum password length
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Role</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 bg-gray-100"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled // Make this field read-only
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition-all"
          >
            Create Organiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdCreateOrganiser;
