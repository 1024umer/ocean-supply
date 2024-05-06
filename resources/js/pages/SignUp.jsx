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
        <Navigation/>
            <section className='container mx-auto flex justify-center items-center h-screen'>
                <div className="bg-white border rounded-lg p-7 border-gray-900/10 pb-12">
                    <h2 className='font-bold text-3xl text-violet-700'>Signup Page</h2>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                <div className="mt-2">
                                    <input type="text" name="firstName" id="first-name" value={formData.firstName} onChange={handleChange} autoComplete="given-name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                <div className="mt-2">
                                    <input type="text" name="lastName" id="last-name" value={formData.lastName} onChange={handleChange} autoComplete="family-name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} autoComplete="email" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="mt-2">
                                    <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} autoComplete="phone" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                <div className="mt-2">
                                    <select name="country" id="country" value={formData.country} onChange={handleChange} autoComplete="country-name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                                <div className="mt-2">
                                    <input type="text" name="streetAddress" id="street-address" value={formData.streetAddress} onChange={handleChange} autoComplete="street-address" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                <div className="mt-2">
                                    <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} autoComplete="address-level2" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                                <div className="mt-2">
                                    <input type="text" name="region" id="region" value={formData.region} onChange={handleChange} autoComplete="address-level1" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                                <div className="mt-2">
                                    <input type="text" name="postalCode" id="postal-code" value={formData.postalCode} onChange={handleChange} autoComplete="postal-code" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                <div className="mt-2">
                                    <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} autoComplete="new-password" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                    </form>
                    Want to Login? <Link className='text-blue-500 ml-3' to={'/login'}>Login</Link>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default SignUp;
