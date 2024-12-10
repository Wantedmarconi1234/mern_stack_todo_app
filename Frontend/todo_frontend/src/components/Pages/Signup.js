// File: src/components/LoginComponent.js
import React, { useState } from 'react';
import { useSignup } from '../Hooks/useSignup';

const Login = () => {
    const [formData, setFormData] = useState({name: "", email: '', password: '' });
    const { isError, isLoading, signup } = useSignup()

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        //prevent the default behavior of the browser
        e.preventDefault();

        //update the signup hook with formData
        await signup({...formData})

        console.log(formData)

        //clear all inputs data 
        setFormData({
            name: "",
            email: "", 
            password: ""
        })
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 className='text-center font-bold text-2xl'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>
                {isError && <div style={{ color: 'red', marginBottom: '10px' }}>{isError}</div>}
                <button disabled={isLoading} type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {isLoading ? 'Signing up...' : 'Signup'}
                </button>
            </form>
        </div>
    );
};

export default Login;
