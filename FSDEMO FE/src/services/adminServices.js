import instance from "./instance";

const adminServices = {
  viewAllUser: async () => {
    return await instance.get("/admin/users");
  },
  deleteOrganiser: async (id) => {
    return await instance.delete("/admin/organisers");
  },
  viewEvents: async () => {
    return await instance.get("/admin/events");
  },
  createOrganiser: async (data) => {
    return await instance.post("/admin/organisers", data);
  },
};

export default adminServices;
