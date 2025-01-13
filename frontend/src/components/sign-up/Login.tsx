import './Login.css'
import React, { useState } from 'react';


const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
                <input 
                type="password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                <button type='submit'>Login</button>
            </form>
            <p>
                New user? <a href="/signup">Sign up here</a>
            </p>
        </div>
    )
}

export default Login;