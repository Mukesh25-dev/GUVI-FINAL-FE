import instance from "./instance";

const organiserServices = {
  createEvent: async (eventData) => {
    return await instance.post("/organiser/events", eventData);
  },
  viewEvents: async () => {
    return await instance.get("/organiser/events");
  },
  updateEvent: async () => {
    return await instance.put("/organiser/events/:id");
  },
  deleteEvent: async () => {
    return await instance.delete("/organiser/events/:id");
  },
  viewApplications: async () => {
    return await instance.get("/organiser/applications");
  },
  updateApplication: async () => {
    return await instance.put("/organiser/applications/:id");
  },
};

export default organiserServices;
