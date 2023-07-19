import React, { useState, useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContex } from "../contex/AuthContex";
import Loading from "../components/Loading";
function ProectedRoute({ shouldAuth }) {
  const { isAuth } = useContext(AuthContex);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    if (shouldAuth) {
      return isAuth ? <Outlet /> : <Navigate to="/login" />;
    } else if (!shouldAuth) {
      return !isAuth ? <Outlet /> : <Navigate to="/" />;
    }
  }
}

export default ProectedRoute;
