import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../config/axiosConfig";
function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    // console.log(user)
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        street_address: user.street_address,
        city: user.city,
        region: user.region,
        postal_code: user.postal_code,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        var response = await service
            .post("/api/profile", formData)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateUserProfile(formData));
                    toast.success("Update successful", {
                        position: "top-right",
                    });
                    navigate("/dashboard");
                } else {
                    toast.error("Update failed", {
                        position: "top-right",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Update failed", {
                    position: "top-right",
                });
            });
    };

    return (
        <>
            <div className="container mx-auto max-w-lg mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="first_name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="last_name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="country"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="street_address"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Street Address
                        </label>
                        <input
                            type="text"
                            id="street_address"
                            name="street_address"
                            value={formData.street_address}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="city"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="region"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Region
                        </label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="postal_code"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postal_code"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}
export default Profile;
