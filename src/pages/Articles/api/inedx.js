import axiosInstance from "../../../axios";

const articlesApi = {
  getArticles: async () => {
    try {
      const res = await axiosInstance.get("/article");
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteArticleById: async (id) => {
    const res = axiosInstance.delete(`/article/${id}`);
    return res.data.data;
  },
};
export default articlesApi;
