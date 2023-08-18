import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import axiosInstance from "../axios";
import axios from "axios";
export const AuthContex = createContext(null);

function AuthContexProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/auth/echo",
          {},
          { withCredentials: true }
        );
        // console.log(res.data.data);

        setIsAuth(true);
        setLoading(false);

        return res.data.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshTokenResponse = await axios.post(
              "http://localhost:3000/auth/refresh-tokens",
              {},
              { withCredentials: true }
            );
            // Assuming your refresh-token endpoint returns a new access token in 'refreshTokenResponse.data.accessToken'
            // Set the new access token in the request headers for future requests

            setIsAuth(true);

            setLoading(false);
          } catch (refreshError) {
            // If token refresh fails or there's another error, logout the user

            setIsAuth(false);
            setLoading(false);
            // navigate('/login')
          }
        } else {
          // Handle other errors
          setIsAuth(false);
          setLoading(false);
        }
      }
    };
    verify();
  }, []);
  return (
    <AuthContex.Provider value={{ isAuth, setIsAuth }}>
      {!loading && children}
    </AuthContex.Provider>
  );
}

export default AuthContexProvider;
