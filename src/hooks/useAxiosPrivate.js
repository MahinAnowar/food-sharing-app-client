import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import auth from "../firebase/firebase.init";

const useAxiosPrivate = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request Interceptor
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // You might want to refresh token here or redirect to login
          // For now, let's just sign out and navigate to login
          signOut(auth);
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    setLoading(false);

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [user, navigate]);

  return { axiosPrivate: axios, loading };
};

export default useAxiosPrivate;
