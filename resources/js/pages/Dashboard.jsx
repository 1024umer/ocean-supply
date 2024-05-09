import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import SidebarMain from "../components/SidebarMain";
import Box from "../components/Box";
import service from "../config/axiosConfig";
function Dashboard() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const getUsers = async () => {
        const response = await service.get("/api/user");
        setUsers(response.data.data);
        setLoading(false)
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSignout = async () => {
        try {
            dispatch(signoutSuccess());
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <>
            {/* <section className="container mx-auto pt-10 px-4">
                <h1 className="text-3xl text-center my-5 font-bold text-white">Dashboard</h1>
                <div className="grid grid-cols-4 gap-4">
                    <Box title='Total Users' total='5' />
                    <Box title='Total Orders' total='14' />
                    <Box title='Total Orders on Clover' total='9' />
                    <Box title='Total Orders on Big Commerce' total='12' />
                </div>
            </section> */}
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                            <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                                <div className="row dashboard-right-top-sec">
                                    <div className="col-lg-8">
                                        <div className="main-user-box">
                                            <div className="two-align-thing">
                                                <h3>Users</h3>
                                                <a onClick={() => handleNavigation("/user/list")} className="t-btn without-shadow"> See All</a>
                                            </div>
                                            <div className="table-box">
                                                <table>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Emails</th>
                                                        <th>Role</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Jhony Bravo</td>
                                                        <td>someone@gmail.com</td>
                                                        <td>User</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jhony Bravo</td>
                                                        <td>someone@gmail.com</td>
                                                        <td>User</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jhony Bravo</td>
                                                        <td>someone@gmail.com</td>
                                                        <td>User</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jhony Bravo</td>
                                                        <td>someone@gmail.com</td>
                                                        <td>User</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jhony Bravo</td>
                                                        <td>someone@gmail.com</td>
                                                        <td>User</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jhony Bravo</td>
                                                        <td>someone@gmail.com</td>
                                                        <td>User</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className="img-abs">
                                                <img className="user-img-top" src="front/images/user-img-top.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="net-profit-box">
                                            <h2>$120k</h2>
                                            <h3>Net Profit</h3>
                                            <ul>
                                                <li>20+ Orders</li>
                                                <li>100k New Users</li>
                                                <li>2K paid Orders</li>
                                            </ul>

                                            <img src="front/images/net-profit-bottom.png" alt=""/>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <div className="price-box">
                                            <div className="heading">
                                                <h2>$140k</h2>
                                                <h3>Total Income </h3>
                                            </div>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            <img src="front/images/price-right-img.png" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="price-box">
                                            <div className="heading">
                                                <h2>190</h2>
                                                <h3>Total Users </h3>
                                            </div>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            <img src="front/images/price-right-img.png" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="price-box">
                                            <div className="heading">
                                                <h2>$10k</h2>
                                                <h3>Last Month Income  </h3>
                                            </div>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            <img src="front/images/price-right-img.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row footer-row">
                                    <div className="col-md-12">
                                        <div className="dash-board-footer">
                                            <div className="two-align-box">
                                                <p>© 2024 | All Rights Are Reserved</p>
                                                <ul>
                                                    <li><a href="#">Facebook</a></li>
                                                    <li><a href="#">Instagram</a></li>
                                                    <li><a href="#">Twitter</a></li>
                                                    <li><a href="#">LinkedIn</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}



export default Dashboard;
