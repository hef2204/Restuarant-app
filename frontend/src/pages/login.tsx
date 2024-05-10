import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/login.css"
import { useNavigate } from 'react-router-dom';




export type LoginProps = {
    onLogin: (username: string, role: string) => void;
};

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

   


    const handleSubmit = async (e: React.FormEvent) => {
        console.log('Form submitted');
        e.preventDefault();
    
        if (!username || !password) {
            console.log('Both fields are required');
            setError('Both fields are required');
            return;
        }
    
        const loginData = {
            username,
            password
        };
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
    
            if (response.ok) {
                const data = await response.json();
                const token = data.access_token; 
    
                
                localStorage.setItem('token', token);
    
                if (data && data.user) {
                    if (data.user.role === 'manager') {
                        if (data.user.restaurantId) {
                            navigate(`/pages/managerPage`);
                            localStorage.setItem('restaurantId', data.user.restaurantId)
                            localStorage.setItem('userId', data.user.id);
                            localStorage.setItem('restaurantName', data.user.restaurantName);
                            localStorage.setItem('role', data.user.role);
                            localStorage.setItem("managerName", data.user.username)
                        } else {
                            console.error('Error: restaurantId is undefined');
                        }
                    } else if (data.user.role === 'user') {
                        navigate('/');
                        localStorage.setItem('userId', data.user.id);
                        localStorage.setItem('role', data.user.role);
                        localStorage.setItem('username', data.user.username);
                        localStorage.setItem('token', token);
                        localStorage.setItem('firstName', data.user.firstName);
                        
                    } else if (data.user.role === 'admin') {
                        navigate('/pages/adminPage');
                        if (data.user.id) {
                            localStorage.setItem('userId', data.user.id);
                            localStorage.setItem('role', data.user.role);
                            localStorage.setItem('username', data.user.username);
                        } else {
                            console.error('Error: admin id is undefined');
                        }
                    }
                } else {
                    console.error('Error: data or data.user is undefined');
                }
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <Link className="about-link" to="/pages/about">About</Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error && <div>{error}</div>}
                <input type="text" placeholder="Username" value={username} onChange={handleEmailChange} />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Login</button>
            </form>
            <button className='back-button' onClick={() => window.location.href = '/'}>back</button>
        </div>
        
    );
};

export default Login;