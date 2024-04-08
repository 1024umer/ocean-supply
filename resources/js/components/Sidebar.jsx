import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    return (
        <div>
            <h1>{user.first_name} {user.last_name}</h1>
            <p>{user.email}</p>
            <p>{user.role.title}</p>
        </div>
    )
}

export default Sidebar
