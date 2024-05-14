import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import service from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { Link } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
export default function subscriptionList() {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const getSubscription = async () => {
        try {
            const response = await service.get("/api/subscriptionList");
            setSubscriptions(response.data.data);
            setFilteredSubscriptions(response.data.data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            toast.error("Failed to fetch subscriptions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubscription();
    }, []);

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.id.includes(value),
            width: "2%",
            className: "text-center",
        },
        {
            title: "Name",
            dataIndex: "name",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: "14%",
            className: "text-center",
        },
        {
            title: "Title",
            dataIndex: "title",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.title.includes(value),
            width: "14%",
            className: "text-center",
        },
        {
            title: "Price",
            dataIndex: "price",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.price.includes(value),
            width: "14%",
            className: "text-center",
            render: (text) => <span>${text}</span>,
        },
        {
            title: "Description",
            dataIndex: "description",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.description.includes(value),
            width: "14%",
            className: "text-center",
        },
        {
            title: "Is Premium",
            dataIndex: "is_premium",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.is_premium === 1,
            width: "14%",
            className: "text-center",
            render: (text) => (
                <span
                    className={`border text-center ${
                        text === 1 ? "badge active" : "badge none-active"
                    }`}
                >
                    {text === 1 ? "Premium" : "Not Premium"}
                </span>
            ),
        },
        {
            title: "Is Active",
            dataIndex: "is_active",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.is_active === 1,
            width: "14%",
            className: "text-center",
            render: (text) => (
                <span
                    className={`border text-center ${
                        text === 1 ? "badge active" : "badge none-active"
                    } `}
                >
                    {text === 1 ? "Active" : "De-Active"}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "14%",
            render: (text, record) => (
                <Link to={`/subscription/${record.id}`} className="">
                    <img src="/front/images/edite.png" alt="edit" />
                </Link>
            ),
            className: "text-center edite-and-delet",
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {};

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = subscriptions.filter(
            (subscriptions) =>
                subscriptions.id.toString().toLowerCase().includes(keyword) ||
                subscriptions.name.toString().toLowerCase().includes(keyword) ||
                subscriptions.title.toString().toLowerCase().includes(keyword) ||
                subscriptions.price.toString().includes(keyword)
        );
        setFilteredSubscriptions(filtered);
    };

    const renderEditButton = (rowData) => {
        return (
            <button
                className="p-button p-button-primary"
                onClick={() => handleEdit(rowData)}
            >
                Edit
            </button>
        );
    };

    const handleEdit = (rowData) => {
        const { id } = rowData;
        navigate(`/subscription/${id}`);
    };

    const products = subscriptions;
    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        {loading ? <Loading /> : <SidebarMain />}

                        <div className="col-lg-9 col-md-9 dashboard-right-sec  ">
                            <div className="row dashboard-right-top-sec">
                                <div className="col-lg-12">
                                    <div className="main-user-box userlist-box subscribtion-table">
                                        <div className="two-align-thing">
                                            <h3>Packages</h3>
                                            <div className="aline-box">
                                                <input
                                                    type="search"
                                                    placeholder="Search"
                                                    onChange={handleSearch}
                                                />
                                                <Link
                                                    to={"/subscription"}
                                                    className="t-btn without-shadow"
                                                >
                                                    {" "}
                                                    Add A Package
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="table-box">
                                            <Table
                                                rowKey="id"
                                                key={subscriptions.id}
                                                columns={columns}
                                                dataSource={
                                                    filteredSubscriptions
                                                }
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
