import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import SidebarMain from "../components/SidebarMain";
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
            <section className="container mx-auto pt-10">
                <h1 className="text-3xl text-center my-5 font-bold text-white">Dashboard</h1>
            </section>
        </>
    );
}

export default Dashboard;
