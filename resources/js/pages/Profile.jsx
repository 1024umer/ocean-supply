import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../config/axiosConfig";
import SidebarMain from "../components/SidebarMain";
function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
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
        store_credit_amount: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
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
                                                        value={
                                                            formData.first_name
                                                        }
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
                                                        value={
                                                            formData.last_name
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="i.e. Elia"
                                                    />
                                                </div>
                                            </div>
                                            <label htmlFor="">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="i.e. someone@example.com"
                                            />

                                            <label htmlFor="">
                                                Contact Number
                                            </label>
                                            <input
                                                type="number"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
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
                                                        value={formData.country}
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
                                                            formData.street_address
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="i.e. Tokyo, Borovo etc."
                                                    />
                                                </div>
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
                                                        value={formData.region}
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
                                                        value={
                                                            formData.postal_code
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="123"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="box">
                                                <label htmlFor="">City</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder="i.e. XXXXX"
                                                />
                                            </div>

                                            {user.role.name === "admin" && (
                                            <div className="box">
                                                <label htmlFor="">
                                                    Store Credit Amount
                                                </label>
                                                <small>
                                                    Please Enter Amount Only for
                                                    Big Commerce
                                                </small>
                                                <input
                                                    type="text"
                                                    id="store_credit_amount"
                                                    name="store_credit_amount"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            )}

                                            <button>Update Now</button>
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
export default Profile;
