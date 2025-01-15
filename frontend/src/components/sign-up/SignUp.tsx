import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const SignUp: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axiosInstance.post('http://127.0.0.1:5000/api/register', {
                email,
                password,
                username,
                firstname,
                lastname
            });
            console.log('User registered successfully:', response.data);
        } catch (error) {
            console.error('There was an error registering the user:', error);
            setError('Registration failed');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <p>Enter First Name
                    <input 
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder='Enter first name'/>
                </p>
                <p>Enter Last Name
                    <input
                        type='text'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder='Enter last name'/>
                </p>
                <p>Enter Username: 
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder='Enter username'
                    />
                </p>
                <p>Enter Email: 
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter Email'
                    />
                </p>
                <p>Enter Password: 
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Enter password'
                    />
                </p>
                <p>Confirm Password: 
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder='Re-enter password'
                    />
                </p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;