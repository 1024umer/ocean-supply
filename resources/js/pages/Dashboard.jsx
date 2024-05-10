import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import SidebarMain from "../components/SidebarMain";
import Box from "../components/Box";
import service from "../config/axiosConfig";
import Loading from "../components/Loading";
import UserDashboard from "../components/UserDashboard";
function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const totalUsers = users.length

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
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        {user.role.name === "admin" && (
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
                                                    {users.slice(0, 6).map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.first_name} {user.last_name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role.title}</td>
                                                    </tr>
                                                    ))}
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
                                                <h2>{totalUsers}</h2>
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
                        )}
                        {user.role.name === "user" && (
                            <UserDashboard />
                        )}
                        </div>
                    </div>
            </section>
        </>
    );
}



export default Dashboard;
