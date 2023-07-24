import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import axiosInstance from "../axios";
export const AuthContex = createContext(null);

function AuthContexProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axiosInstance.post("/auth/echo");
        setIsAuth(true);
        setLoading(false);
        return res.data.data;
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setLoading(false);
      }
    };

    verify();
    // if (token) {
    //   setIsAuth(true);
    // } else {
    //   setIsAuth(false);
    // }
  }, []);
  return (
    <AuthContex.Provider value={{ isAuth, setIsAuth }}>
      {!loading && children}
    </AuthContex.Provider>
  );
}

export default AuthContexProvider;
