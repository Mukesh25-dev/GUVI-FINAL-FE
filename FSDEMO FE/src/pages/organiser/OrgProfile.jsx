import React from "react";
import { useLoaderData } from "react-router";

const OrgProfile = () => {
  const user = useLoaderData();
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
            <p className="text-lg">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
