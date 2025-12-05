import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(error => console.log(error));
            }
            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        }
    }, [logOut, navigate]);


    return axiosSecure;
};

export default useAxiosSecure;
