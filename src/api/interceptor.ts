import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    // headers: {
    //     "Content-Type": "multipart/form-data",
    // }
});

// Request interceptor for authorization token
axiosInstance.interceptors.request.use(
    config => {
        // Get the token from localStorage or wherever you store it
        const token = localStorage.getItem('token');

        // If token exists, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        console.error('Error in request:', error); // Basic error logging
        return Promise.reject(error);
    }
);

export default axiosInstance;