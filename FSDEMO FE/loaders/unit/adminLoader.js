import adminServices from "../../src/services/adminServices";

const adminLoader = async () => {
  try {
    const response = await adminServices.viewAllUser();
    return response.data;
  } catch (error) {
    return null;
  }
};

export default adminLoader;
