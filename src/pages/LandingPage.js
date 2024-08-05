import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LandingPage() {
    const { auth, logout } = useContext(AuthContext);

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Student Management System</h1>
            <p>Manage students, track performance, and more with our intuitive application.</p>

            <div style={{ marginTop: '20px' }}>
                <nav>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {
                            auth ?
                                <>
                                    <li style={{ display: 'inline-block', marginRight: '10px' }}>
                                        <Link to="/students" style={{ textDecoration: 'none', color: '#333', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f0f0f0' }}>Students</Link>
                                    </li>
                                    <li style={{ display: 'inline-block', marginRight: '10px' }}>
                                        <Link to="/courses" style={{ textDecoration: 'none', color: '#333', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f0f0f0' }}>Courses</Link>
                                    </li>
                                    <li style={{ display: 'inline-block' }}>
                                        <button onClick={logout} style={{ textDecoration: 'none', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', background: '#007bff', cursor: 'pointer' }}>Logout</button>
                                    </li>
                                </>
                                :
                                <>
                                    <li style={{ display: 'inline-block', marginRight: '10px' }}>
                                        <Link to="/signup" style={{ textDecoration: 'none', color: '#333', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f0f0f0' }}>Signup</Link>
                                    </li>
                                    <li style={{ display: 'inline-block' }}>
                                        <Link to="/login" style={{ textDecoration: 'none', color: '#333', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f0f0f0' }}>Login</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </nav>
            </div>

            <div style={{ marginTop: '50px', textAlign: 'left' }}>
                <h2>Key Features:</h2>
                <ul style={{ paddingLeft: '20px' }}>
                    <li>Effortlessly manage student records and grades.</li>
                    <li>Track attendance and performance with detailed reports.</li>
                    <li>Intuitive signup and login processes for secure access.</li>
                    <li>Customizable user roles and permissions.</li>
                    <li>Stay updated with notifications and alerts.</li>
                </ul>
            </div>
        </div>
    );
}

export default LandingPage;
