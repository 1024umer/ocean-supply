import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import service from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (id) => {
        try {
            const response = await service.get(`/api/user/${id}`);
            const { data } = response.data;
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        street_address: "",
        city: "",
        region: "",
        postal_code: "",
        store_credit_amount:"",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await service.put(`/api/user/${id}`, user);
            console.log(response.status);
            if (response.status == 200) {
                navigate("/user/list");
            }
        } catch (error) {
            for (const [key, value] of Object.entries(
                error.response.data.errors
            )) {
                toast.error(value[0], {
                    position: "top-right",
                });
            }
        }
    };

    return (
        <>
            <SidebarMain />
            <section className="container mx-auto max-w-lg mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-center mt-10">
                    Edit User
                </h1>
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
                            value={user.first_name}
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
                            value={user.last_name}
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
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
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
                            value={user.phone}
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
                            value={user.country}
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
                            value={user.street_address}
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
                            value={user.city}
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
                            value={user.region}
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
                            value={user.postal_code}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update
                    </button>
                </form>
            </section>
            <ToastContainer />
        </>
    );
}
