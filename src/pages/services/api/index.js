import axiosInstance from "../../../axios";

const ServiceApi = {
  getServices: async () => {
    const res = await axiosInstance.get("/service");
    return res.data.data;
  },
  postService: async (data) => {
    const res = await axiosInstance.post("/service", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
  editService: async (id, data) => {
    const res = await axiosInstance.patch(`/service/${id}`, data);
    return res.data.data;
  },
  deleteService: async (id) => {
    const res = await axiosInstance.delete(`/service/${id}`);
    return res.data.data;
  },
  editServiceImage: async (id, data) => {
    const res = await axiosInstance.patch(`/service/phot/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
};
export default ServiceApi;
