import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

function SidebarMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSignout = async () => {
        try {
            dispatch(signoutSuccess());
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="col-lg-3 col-md-3">
                <div className="main-dash-content">
                    <div className="main-logo">
                        <img src="/front/images/main-logo.png" alt="" />
                    </div>
                    <div className="user-profile">
                        <div className="content">
                            <h2>Welcome Back,</h2>
                            <h3>{user.first_name} {user.last_name}</h3>
                        </div>
                        <div className="profile-img">
                            <Link to={'/profile'}>
                                <img src="/front/images/user-profile-img.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="main-dash-link">
                        <Link to={'/'}>Dashborad</Link>
                    </div>
                    <div className="main-accordion-box">
                        <div id="accordionExample" className="accordion shadow">
                            <div className="card">
                                <div id="headingOne" className="card-header bg-white shadow-sm border-0">
                                    <h2 className="mb-0">
                                        <button type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
                                            aria-controls="collapseOne"
                                            className="btn btn-link text-dark font-weight-bold text-uppercase collapsible-link">Users</button>
                                    </h2>
                                </div>
                                <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample" className="collapse ">
                                    <div className="card-body">
                                        <ul>
                                            <li><Link to={'/profile'}>User Profile</Link></li>
                                            {user.role.name === "admin" && (
                                                <li><Link to={'/user/list'}>All Users</Link></li>
                                            )}
                                            {user.role.name === "admin" && (
                                                <li><Link to={'/clover/user/list'}>Clover Users</Link></li>
                                            )}
                                            {user.role.name === "admin" && (
                                                <li><Link to={'/big-commerce/user/list'}>Big Commerce Users</Link></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {user.role.name === "admin" && (
                            <div className="card">
                                <div id="headingTwo" className="card-header bg-white shadow-sm border-0">
                                    <h2 className="mb-0">
                                        <button type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                            aria-controls="collapseTwo"
                                            className="btn btn-link collapsed text-dark font-weight-bold text-uppercase collapsible-link">Subscription</button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample" className="collapse">
                                    <div className="card-body">
                                        <ul>
                                        {user.role.name === "admin" && (
                                            <li><Link to="/subscription">Subscription</Link></li>
                                        )}
                                        {user.role.name === "admin" && (
                                            <li><Link to="/subscription-list">Subscription List</Link></li>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            )}
                            {user.role.name === "admin" && (
                            <div className="card">
                                <div id="headingThree" className="card-header bg-white shadow-sm border-0">
                                    <h2 className="mb-0">
                                        <button type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree"
                                            className="btn btn-link collapsed text-dark font-weight-bold text-uppercase collapsible-link">Orders</button>
                                    </h2>
                                </div>
                                <div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample" className="collapse">
                                    <div className="card-body">
                                        <ul>
                                        {user.role.name === "admin" && (
                                            <li><Link to="/get/orders">All Orders</Link></li>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            )}
                            {user.role.name === "admin" && (
                            <div className="card">
                                <div id="headingFour" className="card-header bg-white shadow-sm border-0">
                                    <h2 className="mb-0">
                                        <button type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false"
                                            aria-controls="collapseFour"
                                            className="btn btn-link collapsed text-dark font-weight-bold text-uppercase collapsible-link">Points Settings</button>
                                    </h2>
                                </div>
                                <div id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionExample" className="collapse">
                                    <div className="card-body">
                                        <ul>
                                        {user.role.name === "admin" && (
                                            <li><Link to="/setting/update">Settinng</Link></li>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    {user.role.name === "admin" && (
                    <div className="dash-extra-link">
                        <Link to={'/inventory/list'}>Inventories</Link>
                    </div>
                    )}
                    <div className="dash-logout-btn">
                        <Link onClick={handleSignout} className="t-btn t-btn-gradient">Log Out</Link>
                    </div>

                    <div className="two-abs-imgs">
                        <img className="dash-img-top" src="front/images/dash-img-top.png" alt="" />
                        <img className="dash-img-bottom" src="front/images/dash-img-bottom.png" alt="" />
                    </div>

                </div>

            </div>
        </>
    );
}
export default SidebarMain;
