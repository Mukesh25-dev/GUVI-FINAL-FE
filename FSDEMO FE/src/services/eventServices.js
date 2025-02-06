import instance from "./instance";

const eventServices = {
  getEvents: async () => {
    return await instance.get("/user/events");
  },
  getEvent: async (eventId) => {
    return await instance.get(`/user/event/${eventId}`);
  },
  Register: async (eventId) => {
    return await instance.post(`/user/register/${eventId}`);
  },
};

export default eventServices;
