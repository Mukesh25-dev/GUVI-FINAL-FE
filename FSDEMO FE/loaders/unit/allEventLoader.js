import adminServices from "../../src/services/adminServices";

const allEventLoader = async () => {
  try {
    const response = adminServices.viewEvents();
    return response.data;
  } catch (error) {
    return null;
  }
};

export default allEventLoader;
