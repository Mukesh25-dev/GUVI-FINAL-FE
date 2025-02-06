import eventServices from "../../src/services/eventServices";

const eventLoader = async ({ params }) => {
  try {
    const { eventId } = params;
    const response = await eventServices.getEvent(eventId);

    return response.data;
  } catch (error) {
    return {};
  }
};

export default eventLoader;
