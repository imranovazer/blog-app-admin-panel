import axios from "axios";

const axiosInstance = axios.create({
  // baseURL : process.env.BASE_URL ,

  baseURL: "http://localhost:3000",
  withCredentials: true,
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const res = await axios.post(
          "http://localhost:3000/auth/refresh-tokens",
          {},
          { withCredentials: true } // Send refresh token in request
        );
      } catch (error) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      console.log(error.config);
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
