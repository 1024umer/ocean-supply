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
        store_credit_amount: "",
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
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-main-design add-new-lp-charges admin-profile">
                                        <h2 className="form-main-heading">
                                            Update Profile
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="two-inline-inputs">
                                                <div className="box">
                                                    <label htmlFor="">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        value={user.first_name}
                                                        onChange={handleChange}
                                                        placeholder="i.e. Jhon"
                                                    />
                                                </div>
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        value={user.last_name}
                                                        onChange={handleChange}
                                                        placeholder="i.e. Elia"
                                                    />
                                                </div>
                                            </div>
                                            <label htmlFor="">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                placeholder="i.e. someone@example.com"
                                            />

                                            <label htmlFor="">
                                                Contact Number
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={user.phone}
                                                onChange={handleChange}
                                                placeholder="i.e. +1 XXX XXXXXX"
                                            />

                                            <div className="two-inline-inputs">
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Country
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        name="country"
                                                        value={user.country}
                                                        onChange={handleChange}
                                                        placeholder="i.e. Columbia, California, etc."
                                                    />
                                                </div>
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Street Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="street_address"
                                                        name="street_address"
                                                        value={
                                                            user.street_address
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="i.e. Tokyo, Borovo etc."
                                                    />
                                                </div>
                                            </div>
                                            <div className="box">
                                                <label htmlFor="">City</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    value={user.city}
                                                    onChange={handleChange}
                                                    placeholder="i.e. Tokyo, Borovo etc."
                                                />
                                            </div>

                                            <div className="two-inline-inputs">
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Region
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="region"
                                                        name="region"
                                                        value={user.region}
                                                        onChange={handleChange}
                                                        placeholder="i.e. XXXXX"
                                                    />
                                                </div>
                                                <div className="box">
                                                    <label htmlFor="">
                                                        Postal Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="postal_code"
                                                        name="postal_code"
                                                        value={user.postal_code}
                                                        onChange={handleChange}
                                                        placeholder="123"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit">
                                                Update Now
                                            </button>
                                        </form>
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
