import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import ProductModal from "../../../components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button } from "antd"; // Import Button component from antd
import PaymentModal from "../../../components/PaymentModal";

function GetOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
        setLoading(true);
        const response = await service.get("/api/getAllOrders");
        setOrders(response.data.elements);
        setFilteredOrders(response.data.elements);
        setLoading(false);
    };
    useEffect(() => {
        getOrders();
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.id.includes(value),
            width: "25%",
            className: "text-center",
        },
        {
            title: "Date",
            dataIndex: "createdTime",
            onFilter: (value, record) => record.createdTime.includes(value),
            render: (text) => formatTimestamp(text),
            width: "25%",
            className: "text-center",
        },
        {
            title: "Total",
            dataIndex: "total",
            onFilter: (value, record) => record.total.includes(value),
            render: (text) => `$${text}`,
            width: "25%",
            className: "text-center",
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (orderId) => (
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="t-btn without-shadow"
                        data-toggle="modal"
                        data-target={"#myModal" + orderId}
                    >
                        Check Payment
                    </button>
                    <PaymentModal orderId={orderId}></PaymentModal>
                </div>
            ),
            width: "25%",
            className: "text-center",
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {};

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = orders.filter(
            (order) =>
                order.id.toLowerCase().includes(keyword) ||
                formatTimestamp(order.createdTime)
                    .toString()
                    .toLowerCase()
                    .includes(keyword) ||
                order.total.toString().toLowerCase().includes(keyword)
        );
        setFilteredOrders(filtered);
    };

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        {loading ? <Loading /> : <SidebarMain />}

                        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div className="row dashboard-right-top-sec">
                                <div className="col-lg-12">
                                    <div className="main-user-box userlist-box">
                                        <div className="two-align-thing">
                                            <h3>Orders</h3>
                                            <div className="aline-box">
                                                <input
                                                    type="search"
                                                    placeholder="Search"
                                                    onChange={handleSearch}
                                                />
                                                <Link
                                                    to="/order"
                                                    className="t-btn without-shadow"
                                                >
                                                    {" "}
                                                    Create Order
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="table-box">
                                            <Table
                                                columns={columns}
                                                dataSource={filteredOrders}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="img-abs">
                                            <img
                                                className="user-list-img-top"
                                                src="/front/images/user-list-img-top.png"
                                                alt=""
                                            />
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
export default GetOrders;
