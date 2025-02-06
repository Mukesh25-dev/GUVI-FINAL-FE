import instance from "./instance";

const ticketServices = {
  getTickets: async () => {
    try {
      // Ensure that userId is being correctly passed into the API URL
      const response = await instance.get(`/user/tickets/${userId}`);
      console.log("Tickets fetched:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error; // Rethrow the error to be handled in the loader
    }
  },
};

export default ticketServices;
