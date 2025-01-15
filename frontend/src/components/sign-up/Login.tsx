import './Login.css'
import React, { useState } from 'react';


const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className='form'>
                <p>
                <input
                type="email"
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
                </p>
                <p>                <input 
                type="password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                </p>

                <button type='submit'>Login</button>
            </form>
            <p>New User?<br></br>
                 <a href="/signup">Sign up here</a>
            </p>
        </div>
    )
}

export default Login;