import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import SidebarMain from "../components/SidebarMain";
import Box from "../components/Box";
function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
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
            <SidebarMain/>
            <section className="container mx-auto pt-10 px-4">
                <h1 className="text-3xl text-center my-5 font-bold text-white">Dashboard</h1>
                <div className="grid grid-cols-4 gap-4">
                    <Box title='Total Users' total='5'/>
                    <Box title='Total Orders' total='14'/>
                    <Box title='Total Orders on Clover' total='9'/>
                    <Box title='Total Orders on Big Commerce' total='12'/>
                </div>
            </section>
        </>
    );
}

export default Dashboard;
