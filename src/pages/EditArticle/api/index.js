import axiosInstance from "../../../axios";

const EditArticleApi = {
  getArticleById: async (id) => {
    const res = await axiosInstance.get(`/article/${id}`);
    return res.data.data;
  },
  edtiArticle: async (id, data) => {
    const res = await axiosInstance.patch(`/article/${id}`, data);
  },
  editArticleImage: async (id, data) => {
    const res = await axiosInstance.patch(`/article/photo/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default EditArticleApi;
