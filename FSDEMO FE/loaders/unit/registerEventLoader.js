import profileServices from "../../src/services/profileServices";

const registerEventLoader = async () => {
  try {
    const response = await profileServices.myRegistrations();

    return response.data;
  } catch (error) {
    return {};
  }
};

export default registerEventLoader;
