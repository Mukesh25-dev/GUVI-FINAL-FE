import jobServices from "../../src/services/jobServices";

const jobsLoader = async ({ params }) => {
  try {
    const response = await jobServices.getJob(params.id);

    return response.data;
  } catch (error) {
    return {};
  }
};

export default jobsLoader;
