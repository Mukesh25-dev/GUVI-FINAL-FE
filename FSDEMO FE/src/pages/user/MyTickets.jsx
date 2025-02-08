import React from "react";
import { useLoaderData } from "react-router";

const MyTickets = () => {
  const tickets = useLoaderData(); // Get tickets from the loader

  if (!tickets) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
        <p className="text-gray-500">No tickets found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="p-4 bg-white shadow-md rounded-lg mb-4"
        >
          <h3 className="font-bold text-lg mb-1">
            {ticket.eventId?.title || "Event Title Unavailable"}
          </h3>
          <p className="text-gray-700">
            <strong>Ticket Type:</strong> {ticket.ticketType}
          </p>
          <p className="text-gray-700">
            <strong>Order ID:</strong> {ticket.orderId}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
