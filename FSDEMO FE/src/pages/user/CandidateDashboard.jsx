import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import eventServices from "../../services/eventServices";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/auth/userSlice";

const CandidateDashboard = () => {
  const events = useLoaderData();
  console.log(events);
  const navigate = useNavigate();
  const userId = { userid: "user._id" };

  const [category, setCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const categories = [...new Set(events.map((event) => event.category))];
    setFilteredEvents(categories.length > 0 ? events : []);
  }, [events]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setFilteredEvents(
      selectedCategory
        ? events.filter((event) => event.category === selectedCategory)
        : events
    );
  };

  const handleApply = async (eventId) => {
    try {
      const response = await eventServices.Register(eventId);
      toast.success(response.data.message);

      if (!registeredEvents.includes(eventId)) {
        setRegisteredEvents((prev) => [...prev, eventId]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleBookTickets = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      navigate(`/book-ticket/${eventId}`);
    } else {
      toast.error("Please register for the event before booking tickets.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Explore Amazing Events
      </h2>

      <div className="flex justify-center mb-8">
        <label htmlFor="category" className="mr-4 text-gray-700 font-semibold">
          Filter by Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Knowledge">Knowledge</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()} <br />
                  <strong>Location:</strong> {event.location}
                </p>

                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => handleBookTickets(event._id)}
                  >
                    Book Tickets
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={() => handleApply(event._id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No events found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
