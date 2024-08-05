import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Function to get the bearer token from localStorage or wherever it's stored
const getBearerToken = () => {
    const token = localStorage.getItem('token'); // Adjust based on where your token is stored
    return `Bearer ${token}`;
};

// Axios instance with default configurations, including headers
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the bearer token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getBearerToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

export const getStudents = async () => {
    return await axiosInstance.get('/api/students');
};

export const getStudentById = async (id) => {
    return await axiosInstance.get(`/api/students/${id}`);
};

export const createStudent = async (studentData) => {
    return await axiosInstance.post('/api/students', studentData);
};

export const updateStudent = async (id, studentData) => {
    return await axiosInstance.put(`/api/students/${id}`, studentData);
};

export const deleteStudentById = async (id) => {
    return await axiosInstance.delete(`/api/students/${id}`);
};
