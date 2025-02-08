import ticketServices from "../../src/services/ticketServices";

const TicketLoader = async ({ params }) => {
  try {
    const { userId } = params;

    if (!userId) {
      throw new Error("User ID is required");
    }

    // Fetch tickets using the userId
    const tickets = await ticketServices.getTickets(userId);

    return tickets;
  } catch (error) {
    console.error("Error loading tickets:", error);
    return []; // Return an empty array if there's an error
  }
};

export default TicketLoader;
