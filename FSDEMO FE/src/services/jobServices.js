import instance from "./instance";

const jobServices = {
  getJobs: async () => {
    return await instance.get("/user/jobs");
  },
  getJob: async (id) => {
    return await instance.get(`/user/jobs/${id}`);
  },
  applyJob: async (id) => {
    return await instance.post(`/user/apply/${id}`);
  },
};

export default jobServices;
