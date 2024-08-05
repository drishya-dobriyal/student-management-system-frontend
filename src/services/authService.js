import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const handleAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return { error: error.response.data.error || 'An error occurred. Please try again.' };
        } else if (error.request) {
            return { error: 'No response received from server. Please try again later.' };
        } else {
            return { error: 'An error occurred while setting up the request. Please try again.' };
        }
    } else {
        return { error: 'An unexpected error occurred. Please try again.' };
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/check`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};
