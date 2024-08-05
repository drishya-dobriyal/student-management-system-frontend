import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import './SignupPage.css';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { signup } = useContext(AuthContext);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await signup({ username, password, role });
            if (result.error) {
                setErrorMessage(result.error);
                return;
            }
            setErrorMessage('');
            console.log('Signup successful:', result);
        } catch (error) {
            setErrorMessage('Signup failed.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <input
                        id="role"
                        type="text"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default SignupPage;
