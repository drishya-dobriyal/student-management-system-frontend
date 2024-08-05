// src/components/Footer.js

import React from 'react';
import './Footer.css'; // Import the CSS for Footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Student Management System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
