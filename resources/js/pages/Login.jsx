import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

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
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
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
            <section className='container mx-auto flex justify-center items-center h-screen'>
                <div className="border rounded-lg p-7 border-gray-900/10 pb-12">
                    <h2 className='font-bold text-3xl text-violet-700'>Login Page</h2>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use your email and password to Login</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} autoComplete="email" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                    </form>
                    Want to Signup? <Link className='text-blue-500 ml-3' to={'/'}>SignUp</Link>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Login;
