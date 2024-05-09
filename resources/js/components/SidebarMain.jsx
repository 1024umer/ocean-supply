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
            {/* <Navbar fluid rounded className="bg-gray-50 custome-b-01" >
                <Navbar.Brand as={Link} href="https://flowbite-react.com">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                        Ocean Supply
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name}</span>
                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={handleSignout}>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Toggle />
                <Navbar.Collapse>

                </Navbar.Collapse>
            </Navbar>
            <Sidebar
                aria-label="Sidebar with logo branding example"
                className="h-screen  custome-b-02"
            >
                <Sidebar.Items >
                    <Sidebar.ItemGroup >
                        <Sidebar.Item
                            icon={HiChartPie}
                            onClick={() => handleNavigation("/")}
                        >
                            Dashboard
                        </Sidebar.Item>
                        {user.role.name === "admin" && (
                            <Sidebar.Item
                                icon={HiInbox}
                                onClick={() =>
                                    handleNavigation("/subscription")
                                }
                            >
                                Subscription
                            </Sidebar.Item>
                        )}
                        {user.role.name === "admin" && (
                            <Sidebar.Item
                                icon={HiViewBoards}
                                onClick={() =>
                                    handleNavigation("/subscription-list")
                                }
                            >
                                Subscription List
                            </Sidebar.Item>
                        )}
                        <Sidebar.Item
                            icon={HiUser}
                            onClick={() => handleNavigation("/profile")}
                        >
                            Users Profile
                        </Sidebar.Item>
                        {user.role.name === "admin" && (
                            <Sidebar.Item
                                icon={HiTable}
                                onClick={() => handleNavigation("/user/list")}
                            >
                                User List
                            </Sidebar.Item>
                        )}
                        {user.role.name === "admin" && (
                            <Sidebar.Item
                                icon={HiTable}
                                onClick={() => handleNavigation("/inventory/list")}
                            >
                                Inventories
                            </Sidebar.Item>
                        )}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar> */}
            <div className="col-lg-3 col-md-3">
                <div className="main-dash-content">
                    <div className="main-logo">
                        <img src="front/images/main-logo.png" alt="" />
                    </div>
                    <div className="user-profile">
                        <div className="content">
                            <h2>Welcome Back,</h2>
                            <h3>{user.first_name} {user.last_name}</h3>
                        </div>
                        <div className="profile-img">
                            <img src="front/images/user-profile-img.png" alt="" />
                        </div>
                    </div>
                    <div className="main-dash-link">
                        <a onClick={() => handleNavigation("/")} href="#">Dashborad</a>
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
                                            <li><a onClick={() => handleNavigation("/profile")}>User Profile</a></li>
                                            {user.role.name === "admin" && (
                                                <li><a onClick={() => handleNavigation("/user/list")}>All Users</a></li>
                                            )}
                                            {user.role.name === "admin" && (
                                                <li><a onClick={() => handleNavigation("/clover/user/list")}>Clover Users</a></li>
                                            )}
                                            {user.role.name === "admin" && (
                                                <li><a onClick={() => handleNavigation("/big-commerce/user/list")}>Big Commerce Users</a></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
                                            <li><a onClick={() => handleNavigation("/subscription")}>Subscription</a></li>
                                        )}
                                        {user.role.name === "admin" && (
                                            <li><a onClick={() => handleNavigation("/subscription-list")}>Subscription List</a></li>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dash-extra-link">
                        <a onClick={() => handleNavigation("/inventory/list")}>Inventories</a>
                    </div>
                    <div className="dash-logout-btn">
                        <a onClick={handleSignout} className="t-btn t-btn-gradient">Log Out</a>
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
