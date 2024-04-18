import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";
import { Navbar } from "flowbite-react";

function SidebarMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    return (
        <Sidebar aria-label="Sidebar with logo branding example">
            <Sidebar.Logo href="#" img="/favicon.ico" imgAlt="Flowbite logo">
                Flowbite
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    {user.role.name === "admin" && (
                        <Link to="/subscription">
                            <Sidebar.Item href="#" icon={HiInbox}>
                                Subscription
                            </Sidebar.Item>
                        </Link>
                    )}
                    {user.role.name === "admin" && (
                        <Link to="/subscription-list">
                            <Sidebar.Item href="#" icon={HiViewBoards}>
                                Subscription List
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link to="/profile">
                        <Sidebar.Item icon={HiUser}>Users Profile</Sidebar.Item>
                    </Link>
                    {user.role.name === "admin" && (
                        <Link to="/user/list">
                            <Sidebar.Item href="#" icon={HiTable}>
                                User List
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        Products
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
export default SidebarMain;
