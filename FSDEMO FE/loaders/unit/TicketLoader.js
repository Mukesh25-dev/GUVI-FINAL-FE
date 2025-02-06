import ticketServices from "../../src/services/ticketServices";

const TicketLoader = async ({ userId }) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Fetch tickets from the API using the userId
    const tickets = await ticketServices.getTickets(userId);

    return tickets; // Return the fetched tickets to be used by the component
  } catch (error) {
    console.error("Error loading tickets:", error);
    return []; // Return an empty array if there's an error
  }
};

export default TicketLoader;
