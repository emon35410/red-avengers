import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

let isInterceptorAttached = false;

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInterceptorAttached) return;

        // Request Interceptor
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        // Response Interceptor
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const statusCode = error?.response?.status;

                if (statusCode === 401) {
                    await logOut();
                    navigate("/login");
                    toast.error("Session expired!", { id: 'auth-error' }); 
                } 
                else if (statusCode === 403) {
                    const message = error.response?.data?.message || "Action Denied: Read-only mode!";
                    
                    toast.error(message, {
                        id: 'demo-restriction', // Unique ID ensures only one toast shows
                        icon: '🚫',
                        style: { background: '#1f2937', color: '#fff' }
                    });
                }
                return Promise.reject(error);
            }
        );

        isInterceptorAttached = true; 

    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;