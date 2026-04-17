import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000' 
    // baseURL: 'https://red-avengers-server.onrender.com' 
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;