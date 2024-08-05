import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './LoginForm.css'; // Import the CSS file

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, success } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ username, password });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
}

export default LoginForm;
