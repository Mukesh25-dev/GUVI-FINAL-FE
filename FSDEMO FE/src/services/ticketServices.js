import instance from "./instance";

const ticketServices = {
  getTickets: async (userId) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const response = await instance.get(`/user/tickets/${userId}`);
      console.log("Tickets fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },
};

export default ticketServices;
