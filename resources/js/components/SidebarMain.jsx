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
            <Navbar fluid rounded className="bg-gray-50">
                <Navbar.Brand as={Link} href="https://flowbite-react.com">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
                className="h-screen"
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
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
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
}
export default SidebarMain;
