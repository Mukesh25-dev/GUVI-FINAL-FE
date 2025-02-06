import React from "react";
import { useLoaderData } from "react-router";

const MyTickets = () => {
  const tickets = useLoaderData(); // Get tickets from the loader

  console.log("Tickets in MyTickets component:", tickets); // Debugging log

  if (!tickets || tickets.length === 0) {
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
        <div key={ticket._id} className="p-2 border rounded mb-2">
          <h3 className="font-bold">{ticket.eventId.title}</h3>
          <p>Ticket Type: {ticket.ticketType}</p>
          <p>Order ID: {ticket.orderId}</p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
