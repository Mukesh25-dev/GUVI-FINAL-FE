import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { selectUser } from "../../redux/features/auth/userSlice";

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow-lg">
      {!user && (
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
          <p className="text-lg mb-4">
            Please login or register to access the dashboard.
          </p>
          <Link to="/login" className="text-blue-500 hover:underline mr-4">
            Login
          </Link>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </>
      )}
      {user && user.role === "user" && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Candidate Dashboard
          </h1>
          <p className="text-lg mb-4">
            You can view and manage your applications here.
          </p>
          <Link
            to="/candidate/applications"
            className="text-blue-500 hover:underline"
          >
            View Applications
          </Link>
          <Link
            to="/candidate/dashboard"
            className="text-blue-500 hover:underline ml-12"
          >
            DashBoard
          </Link>
          <Link
            to="/candidate/profile"
            className="text-blue-500 hover:underline ml-12"
          >
            Profile
          </Link>
        </>
      )}
      {user && user.role === "organiser" && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Organiser Dashboard
          </h1>
          <p className="text-lg mb-4">
            You can manage events and registrations here.
          </p>
          <Link
            to="/organiser/create-events"
            className="text-blue-500 hover:underline mr-4"
          >
            Create Events
          </Link>
          <Link
            to="/organiser/manage-registrations"
            className="text-blue-500 hover:underline"
          >
            Manage Registrations
          </Link>
        </>
      )}
      {user && user.role === "admin" && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg mb-4">
            You can manage users, events, and registrations here.
          </p>
          <Link
            to="/admin/dashboard"
            className="text-blue-500 hover:underline mr-4"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/create-organiser"
            className="text-blue-500 hover:underline mr-4"
          >
            Create Organiser
          </Link>
          <Link to="/admin/tickets" className="text-blue-500 hover:underline">
            Tickets
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
