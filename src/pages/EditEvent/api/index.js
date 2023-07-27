import axiosInstance from "../../../axios";

const EditEventApi = {
  getEventById: async (id) => {
    const res = await axiosInstance.get(`/event/${id}`);
    return res.data.data;
  },
  editEvent: async (id, data) => {
    const res = await axiosInstance.patch(`/event/${id}`, data);
  },
  editEventImage: async (id, data) => {
    const res = await axiosInstance.patch(`/event/photo/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default EditEventApi;
