import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import ProductModal from "../../../components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cart/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function GetOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
        setLoading(true);
        const response = await service.get("/api/getAllOrders");
        console.log(response.data.elements);
        setOrders(response.data.elements);
        setLoading(false);
    };
    useEffect(() => {
        getOrders();
    }, []);
    if (loading) {
        return <Loading />;
    }
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />

                        <div class="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div class="row dashboard-right-top-sec">
                                <div class="col-lg-12">
                                <div class="main-user-box userlist-box">
                                    <div class="two-align-thing">
                                    <h3>Users</h3>
                                    <div class="aline-box">
                                        <input type="search" placeholder="Search"/>
                                        <a href="#" class="t-btn without-shadow"> Export ,CSV File</a>
                                    </div>
                                    </div>
                                    <div class="table-box">
                                    <table>
                                        <tr>
                                        <th>#</th>
                                        {/* <th>Products</th> */}
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                        </tr>

                                        {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            {/* <td>{order.lineItems.elements.map((item) => item.title)}</td> */}
                                            <td>{formatTimestamp(order.createdTime)}</td>
                                            <td>{order.total}</td>
                                            <td class="edite-and-delet">
                                            <ul>
                                                <li><a href="#"><img src="/front/images/check-double.png" alt=""/></a></li>
                                                <li><a href="#"><img src="/front/images/cross.png" alt=""/></a></li>
                                            </ul>
                                            </td>
                                        </tr>
                                        ))}

                                    </table>
                                    </div>
                                    <div class="img-abs">
                                    <img  class="user-list-img-top" src="/front/images/user-list-img-top.png" alt=""/>
                                    </div>
                                </div>
                                <div class="page-pagination">
                                    <ul>
                                    <li><a href="#" class="active">&lt;</a></li>
                                    <li><a href="#" class="active">01</a></li>
                                    <li><a href="#">02</a></li>
                                    <li><a href="#" class="active">&gt;</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

export default GetOrders
