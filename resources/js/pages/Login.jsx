import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import service from '../config/axiosConfig';
import  Navigation  from '../components/Navigation';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await service.post('/api/login', formData);
            if (response) {
                const { token, user } = response.data;
                localStorage.setItem('token', JSON.stringify(token));
                dispatch(signInSuccess(user));
                navigate('/dashboard');
                setFormData({
                    email: '',
                    password: '',
                });
                toast.success('Login successful!', {
                    position: 'top-center'
                });
            }
        } catch (error) {
            let errorMessage = 'An error occurred';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage, {
                position: 'top-center'
            });
        }
    };



    return (
        <>
            <section className="main-bg-design login-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-form-box">
                                <div className="main-logo">
                                    <img src="assets/images/main-logo.png" alt=""/>
                                </div>
                                <div className="headings">
                                    <h2>Welcome Back,</h2>
                                    <h1>Login With Your Account</h1>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <label>Email Address</label>
                                    <input  type="email" name="email" id="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="i.e. someone@example.com" />
                                    <label>Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} autoComplete="new-password" placeholder="Your account password"/>
                                    <div className="check-box">
                                        <input type="checkbox" id="showPasswordCheckbox"/>
                                        <label htmlFor="showPasswordCheckbox">Show Password</label>
                                    </div>
                                    <div className="two-btns-inline">
                                        <button type="submit" className="t-btn t-btn-gradient">Login Now</button>
                                        <Link className="t-btn t-btn-simple" to={'/'}>Create A New Account</Link>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>  
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Login;
