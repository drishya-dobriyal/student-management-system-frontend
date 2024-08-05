// src/components/Header.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css'; // Import the CSS for Header

const Header = () => {
    const { auth, logout } = useContext(AuthContext);
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">Student Management System</h1>
                <nav className="nav">
                    <ul>
                        {
                            auth ?
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/students">View Students</Link></li>
                                    <li><Link to="/courses">View Course</Link></li>
                                    <li><button onClick={logout}>Logout</button></li>
                                </>
                                : <>
                                    <li><Link to="/signup">Signup</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
