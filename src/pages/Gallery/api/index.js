import axiosInstance from "../../../axios";

const galleryApi = {
  getAll: async () => {
    try {
      const res = await axiosInstance.get("/gallery");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id) => {
    try {
      const res = await axiosInstance.get(`/gallery/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  uploadImage: async (data) => {
    try {
      const res = await axiosInstance.post("/gallery", data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (id) => {
    const res = await axiosInstance.delete(`/gallery/${id}`);
    return res.data.data;
  },
};

export default galleryApi;
