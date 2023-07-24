import axiosInstance from "../../../axios";

const blogApi = {
  getAll: async () => {
    try {
      const res = await axiosInstance.get("/blog");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id) => {
    try {
      const res = await axiosInstance.get(`/blog/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (id) => {
    const res = await axiosInstance.delete(`/blog/${id}`);
    return res.data.data;
  },
};

export default blogApi;
