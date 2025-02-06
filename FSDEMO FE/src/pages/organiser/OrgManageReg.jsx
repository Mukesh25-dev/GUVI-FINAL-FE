import React from "react";
import { useLoaderData } from "react-router";

const OrgManageReg = () => {
  const events = useLoaderData();
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Manage Registrations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-semibold">
                Location: {event.location}
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">
                Registered Attendees:
              </h3>
              <ul className="mt-2">
                {event.attendees.length > 0 ? (
                  event.attendees.map((attendee) => (
                    <li
                      key={attendee._id}
                      className="text-gray-700 bg-gray-200 rounded-lg p-2 mb-2"
                    >
                      <strong>{attendee.name}</strong> - {attendee.email}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No attendees yet.</p>
                )}
              </ul>
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

export default OrgManageReg;
