import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signupSuccess } from '../redux/user/userSlice';
import service from '../config/axiosConfig';
import Navigation from '../components/Navigation';
const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subscriptionId } = useParams();
    useEffect(() => {
        if (!subscriptionId) {
            navigate('/');
        }
    }, [subscriptionId, navigate]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        streetAddress: '',
        city: '',
        region: '',
        postalCode: '',
        password: '',
        password_confirmation: '',
        subscriptionId: subscriptionId
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await service.post('/api/register', formData);

            if (response.status === 200) {
                const { token, user } = response.data.data;
                localStorage.setItem('token', JSON.stringify(token));
                dispatch(signupSuccess(user));
                navigate('/dashboard');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    country: '',
                    streetAddress: '',
                    city: '',
                    region: '',
                    postalCode: '',
                    password: '',
                    password_confirmation: '',
                    subscriptionId: subscriptionId
                });
                toast.success('Signup successful!', {
                    position: 'top-center'
                });
            } else {
                toast.error(response.data.message, {
                    position: 'top-center'
                });
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: 'top-center'
                });
            } else {
                toast.error('An error occurred. Please try again later.', {
                    position: 'top-center',
                    autoClose: 2000
                });
            }
        }
    };

    return (
        <>
            <section className="main-bg-design signup-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-form-box">
                                <div className="main-logo">
                                    <img src="/images/main-logo.png" alt=""/>
                                </div>
                                <div className="headings">
                                    <h2>Welcome Someone,</h2>
                                    <h1>Kindly Fill The Form</h1>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <label>First Name</label>
                                    <input type="text" name="firstName" id="first-name" value={formData.firstName} onChange={handleChange} autoComplete="given-name" placeholder="i.e. Jhony"/>
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" id="last-name" value={formData.lastName} onChange={handleChange} autoComplete="family-name" placeholder="i.e. Bravo"/>
                                    <label>Email Address</label>
                                    <input  type="email" name="email" id="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="i.e. someone@example.com"/>
                                    <label>Contact Number</label>
                                    <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} autoComplete="phone" placeholder="i.e. +1 XXX XXXXXXX"/>
                                    <label htmlFor="country">Country</label>
                                        <select name="country" id="country" value={formData.country} onChange={handleChange} autoComplete="country-name">
                                            <option value="united-states">United States</option>
                                            <option value="canada">Canada</option>
                                            <option value="maxico">Mexico</option>
                                        </select>
                                    <label>City</label>
                                    <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} autoComplete="address-level2" placeholder="i.e. XXXXX"/>
                                    <label>Street Address</label>
                                    <input type="text" name="streetAddress" id="street-address" value={formData.streetAddress} onChange={handleChange} autoComplete="street-address" placeholder="i.e. XXXXX"/>
                                    <label>Region</label>
                                    <input type="text" name="region" id="region" value={formData.region} onChange={handleChange} autoComplete="address-level1" placeholder="i.e. XXXXX"/>
                                    <label>Postal Code</label>
                                    <input type="text" name="postalCode" id="postal-code" value={formData.postalCode} onChange={handleChange} autoComplete="postal-code" placeholder="i.e. XXXXX"/>

                                    <label>Password</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" id="passwordInput" placeholder="i.e. XXXXX"/>
                                    <label>Confirm Password</label>
                                    <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} autoComplete="new-password" placeholder="i.e. XXXXX"/>
                                    <div className="check-box">
                                        <input type="checkbox" id="showPasswordCheckbox"/>
                                        <label htmlFor="showPasswordCheckbox">Show Password</label>
                                    </div>
                                    <div className="two-btns-inline">
                                        <button type="submit" className="t-btn t-btn-gradient">Create Account</button>
                                        <Link className="t-btn t-btn-simple" to={'/login'}>Back To Login</Link>
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

export default SignUp;
