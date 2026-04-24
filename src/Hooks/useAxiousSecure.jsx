import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor: প্রতি রিকোয়েস্টের সময় লেটেস্ট টোকেন রিড করবে
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor: ৪০১/৪০৩ হ্যান্ডেল করা
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const statusCode = error?.response?.status;
                const serverMessage = error.response?.data?.message || "";

                if (statusCode === 401) {
                    await logOut();
                    navigate("/login");
                    toast.error("Session expired! Please login again.", { id: 'auth-error' });
                } 
                else if (statusCode === 403) {
                    const isDemoError = serverMessage.toLowerCase().includes("demo");
                    if (isDemoError) {
                        toast.error(serverMessage, {
                            id: 'demo-restriction',
                            icon: '🚫',
                            style: { background: '#1f2937', color: '#fff' }
                        });
                    } else {
                        toast.error(serverMessage || "Forbidden: Access Denied", { id: 'actual-403' });
                    }
                }
                return Promise.reject(error);
            }
        );

        // Cleanup function: কম্পোনেন্ট আনমাউন্ট হলে ইন্টারসেপ্টর রিমুভ করবে
        // এতে ডুপ্লিকেট ইন্টারসেপ্টর তৈরির ভয় থাকে না
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;