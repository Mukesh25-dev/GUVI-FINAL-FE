import React from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import adminServices from "../../services/adminServices";

const AdDashboard = () => {
  const users = useLoaderData();
  console.log(users);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (confirmation) {
      try {
        const response = await adminServices.deleteOrganiser();
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">
          Manage your platform's users and their roles.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-600">Role: </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {user.role}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Status: </span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Joined: </span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              {user.role === "organiser" && (
                <button
                  onClick={handleDelete}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
                >
                  Delete Profile
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdDashboard;
