import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";

export default function BigCommerceUsers() {
    const [users, setUsers] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const response = await service.get("/api/getBigCommerceUsers");
        setUsers(response.data.data);
        setFilteredOrders(response.data.data);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.id.includes(value),
            width: "2%",
            textAlign: "center",
            className: "text-center",
        },
        {
            title: "Name",
            dataIndex: "first_name",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.first_name.includes(value),
            width: "23%",
            className: "text-center",
            render: (text, record) => `${text} ${record.last_name}`,
        },
        {
            title: "Email",
            dataIndex: "email",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.email.includes(value),
            width: "23%",
            className: "text-center",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.phone.includes(value),
            width: "23%",
            className: "text-center",
        },
        {
            title: "Date Created",
            dataIndex: "date_created",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.date_created.includes(value),
            width: "23%",
            className: "text-center",
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {};

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = users.filter(
            (users) =>
                users.id.toString().toLowerCase().includes(keyword) ||
                users.first_name.toString().toLowerCase().includes(keyword) ||
                `${users.first_name} ${users.last_name}`
                    .toLowerCase()
                    .includes(keyword)
        );
        setFilteredOrders(filtered);
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
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
                                            <h3>BigCommerce Users</h3>
                                            <div className="aline-box">
                                                <input
                                                    type="search"
                                                    placeholder="Search"
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                        </div>
                                        <div className="table-box">
                                            <Table
                                                rowKey="id"
                                                key={users.id}
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

                            <div className="row footer-row">
                                <div className="col-md-12">
                                    <div className="dash-board-footer">
                                        <div className="two-align-box">
                                            <p>
                                                © 2024 | All Rights Are Reserved
                                            </p>
                                            <ul>
                                                <li>
                                                    <a href="#">Facebook</a>
                                                </li>
                                                <li>
                                                    <a href="#">Instagram</a>
                                                </li>
                                                <li>
                                                    <a href="#">Twitter</a>
                                                </li>
                                                <li>
                                                    <a href="#">LinkedIn</a>
                                                </li>
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
