import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";

export default function CloverUsers() {
    const [users, setUsers] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const response = await service.get("/api/getCloverUsers");
        setUsers(response.data.elements);
        setFilteredOrders(response.data.elements);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);
    if (loading) {
        return <Loading />;
    }

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.id.includes(value),
            width: "33%",
            textAlign: "center",
            className: "text-center",
        },
        {
            title: "Name",
            dataIndex: "firstName",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.firstName.includes(value),
            width: "33%",
            className: "text-center",
        },
        {
            title: "Name",
            dataIndex: "lastName",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.lastName.includes(value),
            width: "33%",
            className: "text-center",
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {};

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = users.filter(
            (users) =>
                users.id.toString().toLowerCase().includes(keyword) ||
                users.firstName.toString().toLowerCase().includes(keyword) ||
                `${users.firstName} ${users.lastName}`
                    .toLowerCase()
                    .includes(keyword)
        );
        setFilteredOrders(filtered);
    };
    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div className="row dashboard-right-top-sec">
                                <div className="col-lg-12">
                                    <div className="main-user-box userlist-box">
                                        <div className="two-align-thing">
                                            <h3>Clover Users</h3>
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
