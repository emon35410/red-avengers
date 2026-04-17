import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://red-avengers-server.onrender.com'
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // request interceptor: will attach token to every request
        const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token'); // অথবা user?.accessToken
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // response interceptor: will handle unauthorized responses
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const statusCode = error?.response?.status;
            if (statusCode === 401 || statusCode === 403) {
                await logOut();
                navigate("/login");
            }
            return Promise.reject(error);
        });

        // interceptors cleanup: to prevent memory leaks
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;