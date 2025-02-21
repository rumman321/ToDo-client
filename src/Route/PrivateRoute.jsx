import React, { useContext } from "react";
import Loading from "../Component/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
  return <Navigate state={location.pathname} to="/login"></Navigate>;
    
  }
  return children;
};

export default PrivateRoute;
