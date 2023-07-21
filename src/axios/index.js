import axios from "axios";

// async function refreshAccessToken() {
//   try {
//     const response = await axios.post("/refresh-token", null, {
//       withCredentials: true, // Send cookies along with the request
//     });

//     const newAccessToken = response.data.access_token; // Assuming the server returns a new access token

//     // You can store the new access token in your state management or local storage here

//     return newAccessToken;
//   } catch (error) {
//     // Handle error if the token refresh fails (e.g., redirect to login)
//     throw error;
//   }
// }

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
  async function (error) {
    localStorage.clear();
    window.location.href = "/login";

    // if (error.response.status == 401) {
    //   // const originalRequest = error.config;
    //   try {
    //     const res = await axiosInstance.post("/auth/refresh-tokens");
    //     // originalRequest.headers = {
    //     //   ...originalRequest,
    //     //   Cookie: `pma_lang=en; accessToken=${res.data}`,
    //     // };
    //     return;
    //     // await axiosInstance(originalRequest);
    //   } catch (error) {
    //     if (error.response?.status === 401) {
    //       localStorage.clear();
    //       window.location.href = "/login";
    //     }
    //   }
    // }
    // // Any status codes that falls outside the range of 2xx cause this function to trigger
    // // Do something with response error
    // return Promise.reject(error);
  }
);

export default axiosInstance;
