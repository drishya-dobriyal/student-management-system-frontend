import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, signup as signupService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            if (localStorage.getItem('token')) {
                if (window.location.pathname === '/signup' || window.location.pathname === '/login') {
                    navigate('/');
                }
                setAuth(true);
            }
            else {
                setAuth(false);
                console.log(window.location.pathname);
                if (window.location.pathname !== '/signup' && window.location.pathname !== '/login') {
                    navigate('/login');
                }
            }
        }
        checkAuth();
    }, [navigate]);

    const login = async (data) => {
        try {
            const response = await loginService(data);
            if (response.error) {
                setError(response.error);
                return;
            }
            localStorage.setItem('token', response.token);
            setAuth(true);
            setSuccess('Successfully loged in');
            setError('');
            navigate('/');
        } catch (error) {
            setAuth(false);
            throw error;
        }
    };

    const signup = async (data) => {
        try {
            const response = await signupService(data);
            if (response.error) {
                setError(response.error);
                return;
            }
            localStorage.setItem('token', response.token);
            setAuth(true);
            setSuccess('Successfully loged in');
            setError('');
            navigate('/');
        } catch (error) {
            setAuth(false);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, signup, error, success }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
