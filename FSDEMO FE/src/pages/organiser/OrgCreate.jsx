import React, { useState } from "react";
import { toast } from "react-toastify";
import organiserServices from "../../services/organiserServices";

const OrgCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    eventData.append("title", formData.title);
    eventData.append("description", formData.description);
    eventData.append("date", formData.date);
    eventData.append("time", formData.time);
    eventData.append("location", formData.location);

    try {
      const response = await organiserServices.createEvent(eventData);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Create an Event
        </h1>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Event Title</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Event Description
            </label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Event Date</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Event Time</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Event Location</label>
            <input
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition-all"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrgCreate;
