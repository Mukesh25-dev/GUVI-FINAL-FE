import eventServices from "../../src/services/eventServices";

const eventsLoader = async () => {
  try {
    const response = await eventServices.getEvents();

    return response.data;
  } catch (error) {
    return {};
  }
};

export default eventsLoader;
