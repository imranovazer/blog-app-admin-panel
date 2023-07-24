import axiosInstance from "../../../axios";
const editBlogApi = {
  editBlog: async (id, data) => {
    try {
      const res = await axiosInstance.patch(`/blog/${id}`, data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  editPhotoOfBlog: async (id, data) => {
    try {
      const res = await axiosInstance.patch(`/blog/photo/${id}`, data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },

  getBlogById: async (id) => {
    try {
      const res = await axiosInstance.get(`/blog/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default editBlogApi;
