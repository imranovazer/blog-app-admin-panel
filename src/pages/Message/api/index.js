import axiosInstance from "../../../axios";

const messageApi = {
  getAll: async () => {
    try {
      const res = await axiosInstance.get("/message");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (id) => {
    try {
      const res = await axiosInstance.delete(`/message/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default messageApi;
