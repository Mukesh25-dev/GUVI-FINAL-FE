import React from "react";
import { useLoaderData } from "react-router";
import profileServices from "../../services/profileServices";
import { toast } from "react-toastify";

const CandidateProfile = () => {
  const user = useLoaderData();
  console.log(user);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (confirmation) {
      try {
        const response = await profileServices.deleteProfile(user._id);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete profile."
        );
      }
    } else {
      toast.info("Profile deletion canceled.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-4">My Profile</h1>
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md"
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
