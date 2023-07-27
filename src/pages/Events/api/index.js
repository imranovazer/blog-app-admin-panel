import axiosInstance from "../../../axios";

const EventsApi = {
  getAllEvents: async () => {
    try {
      const res = await axiosInstance.get("/event");

      return res.data.data;
    } catch (error) {}
  },
  deleteEventById: async (id) => {
    const res = await axiosInstance.delete(`/event/${id}`);

    return res.data.data;
  },
};

export default EventsApi;
