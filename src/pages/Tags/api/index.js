import axiosInstance from "../../../axios";

const tagsApi = {
  getTags: async () => {
    try {
      const res = await axiosInstance.get("/tag");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  createTag: async (name) => {
    try {
      const res = await axiosInstance.post("/tag", {name});
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteTagById: async (id) => {
    const res = axiosInstance.delete(`/tag/${id}`);
    return res.data;
  },
};
export default tagsApi;
