import axios from "axios";

const axiosInstance = axios.create({
  // baseURL : process.env.BASE_URL ,
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      axiosInstance
        .post("/auth/refresh/tokens")
        .then((res) => {
          console.log("Token refreshed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
