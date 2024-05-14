import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import { Table } from "antd";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const response = await service.get("/api/user");
        setUsers(response.data.data);
        setFilteredOrders(response.data.data);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await service.delete(`/api/user/${userId}`);
                if (response.status === 200) {
                    setUsers(users.filter((user) => user.id !== userId));
                    setFilteredOrders(filteredOrders.filter((user) => user.id !== userId));
                    Swal.fire(
                        "Deleted!",
                        "The user has been deleted.",
                        "success"
                    );
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire("Error!", "Failed to delete the user.", "error");
            }
        }
    };
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
            width: "10px",
            textAlign: "center",
        },
        {
            title: "Name",
            dataIndex: "first_name",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.first_name.includes(value),
            render: (text, record) => (
                <Link to={`/user/preview/${record.id}`}>
                    {`${text} ${record.last_name}`}
                </Link>
            ),
            width: "15%",
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "20%",
            cellStyle: { whiteSpace: "normal", wordWrap: "break-word" },
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.email.includes(value),
        },
        {
            title: "Role",
            dataIndex: "role",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.role.includes(value),
            render: (text) => `${text.title}`,
        },
        {
            title: "Phone",
            dataIndex: "phone",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.phone.includes(value),
        },
        {
            title: "Total Points",
            dataIndex: "point",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.point.includes(value),
            render: (text) => (text && text[0] ? text[0].total_points : 0),
        },
        {
            title: "Remaining Points",
            dataIndex: "point",
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.point.includes(value),
            render: (points) =>
                points && points[0] ? points[0].remaining_points : 0,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <>
                    <Link
                        to={`/user/edit/${record.id}`}
                        className="p-button p-button-primary"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(record.id)}
                        className="p-button p-button-danger"
                        style={{ marginLeft: '8px' }}
                    >
                        Delete
                    </button>
                </>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = users.filter(
            (users) =>
                users.id.toString().toLowerCase().includes(keyword) ||
                users.first_name.toString().toLowerCase().includes(keyword) ||
                `${users.first_name} ${users.last_name}`.toLowerCase().includes(keyword) ||
                users.phone.toLowerCase().includes(keyword)
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
                                            <h3>Users</h3>
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
