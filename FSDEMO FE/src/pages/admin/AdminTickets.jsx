import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../services/instance";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await instance.get("/admin/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        All Ticket Purchases
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4">
              <img
                src={
                  ticket.eventId?.imageUrl ||
                  "https://via.placeholder.com/400x200"
                }
                alt={ticket.eventId?.title || "Event Image"}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <h3 className="font-bold text-xl text-gray-800">
              {ticket.eventId?.title || "Event Title Not Found"}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              <strong>User:</strong> {ticket.userId?.name || "Unknown User"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {ticket.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Ticket Type:</strong> {ticket.ticketType}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Payment ID:</strong> {ticket.paymentId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Order ID:</strong> {ticket.orderId}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Purchase Date:</strong>{" "}
              {ticket.purchaseDate
                ? new Date(ticket.purchaseDate).toLocaleString()
                : "Not Available"}
            </p>
            <div className="mt-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTickets;
