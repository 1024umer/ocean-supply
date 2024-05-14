import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import service from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";

export default function SubscriptionForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subscription, setSubscription] = useState({
        name: "",
        title: "",
        price: "",
        is_premium: false,
        is_active: true,
    });

    useEffect(() => {
        if (id) {
            fetchSubscription(id);
        }
    }, [id]);

    const fetchSubscription = async (id) => {
        try {
            const response = await service.get(`/api/subscription/${id}`);
            const { data } = response.data;
            setSubscription(data);
        } catch (error) {
            console.error("Error fetching subscription:", error);
        }
    };

    const handleChange = (e) => {
        const { name, checked, value } = e.target;
        const newValue =
            name === "is_premium" || name === "is_active" ? checked : value;
        setSubscription((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (id) {
                response = await service.put(
                    `/api/subscription/${id}`,
                    subscription
                );
            } else {
                response = await service.post(
                    "/api/subscription",
                    subscription
                );
            }
            if (response.status === 201 || response.status === 200) {
                navigate("/subscription-list");
            }
        } catch (error) {
            console.error("Error:", error.response.data.errors);
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
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />

                        {/* <div className="container mx-auto max-w-lg mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6">
                    {id ? "Edit" : "Create"} Subscription
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={subscription.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={subscription.title}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={subscription.price}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={subscription.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="is_premium"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Is Premium
                        </label>
                        <input
                            type="checkbox"
                            id="is_premium"
                            name="is_premium"
                            value={subscription.is_premium}
                            checked={subscription.is_premium}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="is_active"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Is Active
                        </label>
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            value={subscription.is_active}
                            checked={subscription.is_active}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        {id ? "Update" : "Create"}
                    </button>
                </form>
            </div> */}

                        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-main-design add-new-lp-charges">
                                        <h2 className="form-main-heading">
                                            {id
                                                ? "Edit Package"
                                                : "Add New Packages"}
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="two-inline-inputs">
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Package Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={
                                                            subscription.name
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="i.e. Bronze, Platinum, etc."
                                                    />
                                                </div>
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        value={
                                                            subscription.title
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="i.e. $120"
                                                    />
                                                </div>
                                            </div>
                                            <div className="box">
                                                <label htmlFor="">Price</label>
                                                <input
                                                    type="text"
                                                    id="price"
                                                    name="price"
                                                    value={subscription.price}
                                                    onChange={handleChange}
                                                    placeholder="i.e. $120"
                                                />
                                            </div>
                                            <label htmlFor="">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={subscription.description}
                                                onChange={handleChange}
                                                placeholder="Type here..."
                                            ></textarea>

                                            <div className="two-radio-boxes-inline">
                                                <div className="input-radio-box">
                                                    <label htmlFor="">
                                                        Is This Package Is Premium & Active ?
                                                    </label>
                                                    <div className="radio-box">
                                                        <input
                                                            type="checkbox"
                                                            id="is_premium"
                                                            name="is_premium"
                                                            value={
                                                                subscription.is_premium
                                                            }
                                                            checked={
                                                                subscription.is_premium
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <label htmlFor="is_premium">
                                                            Premium?
                                                        </label>
                                                    </div>
                                                    <div className="radio-box">
                                                        <input
                                                            type="checkbox"
                                                            id="is_active"
                                                            name="is_active"
                                                            value={subscription.is_active}
                                                            checked={subscription.is_active}
                                                            onChange={handleChange}
                                                        />
                                                        <label for="is_active">
                                                            Active?
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit">{id ? "Update Now" : "Add Now"}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="row footer-row">
                                <div className="col-md-12">
                                    <div className="dash-board-footer">
                                        <div className="two-align-box">
                                            <p>
                                                © 2024 | All Rights Are Reserved
                                            </p>
                                            <ul>
                                                <li>
                                                    <a href="#">Facebook</a>
                                                </li>
                                                <li>
                                                    <a href="#">Instagram</a>
                                                </li>
                                                <li>
                                                    <a href="#">Twitter</a>
                                                </li>
                                                <li>
                                                    <a href="#">LinkedIn</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer />
        </>
    );
}
