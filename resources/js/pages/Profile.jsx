import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useSelector(state => state.user)
// console.log(user)
const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e) => {
    const token = localStorage.getItem('token').replace(/"/g, '');
    // console.log(token)
    const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    };
    e.preventDefault();
    var response = axios.post('http://127.0.0.1:8000/api/profile', formData,config);
    dispatch(updateUserProfile(formData));
};

    return (
        <>
            <div className="container mx-auto max-w-lg mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">First Name</label>
                        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">Last Name</label>
                        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Profile</button>
                </form>
            </div>
        </>
    )
}
export default Profile
