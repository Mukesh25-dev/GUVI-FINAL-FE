import React from "react";
import { useLoaderData } from "react-router";

const OrgDashboard = () => {
  const events = useLoaderData();
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        My Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-500 text-sm">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">{event.location}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrgDashboard;
