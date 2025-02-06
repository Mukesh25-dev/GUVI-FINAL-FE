import instance from "./instance";

const profileServices = {
  updateProfile: async () => {
    return await instance.put("/user/update");
  },
  deleteProfile: async () => {
    return await instance.delete("/user/delete");
  },
  myRegistrations: async () => {
    return await instance.get("/user/applications");
  },
};

export default profileServices;
