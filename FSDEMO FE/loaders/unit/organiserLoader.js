import organiserServices from "../../src/services/organiserServices";

const organiserLoader = {
  viewAll: async () => {
    const response = await organiserServices.viewEvents();
    return response.data;
  },
  viewApplications: async () => {
    const response = await organiserServices.viewApplications();
    return response.data;
  },
};

export default organiserLoader;
