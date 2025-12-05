import axios from "axios";
import { useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider"; // Assuming this path

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_AP,
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext); // Assuming logOut is available
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Response Interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup function for interceptors
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;