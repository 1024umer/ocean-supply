import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const handleSignout = async () => {
        try {
            dispatch(signoutSuccess());
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <Sidebar />
            <div>
                <button onClick={handleSignout}>Signout</button>
                <h1>Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard
