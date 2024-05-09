import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const response = await service.get("/api/user");
        setUsers(response.data.data);
        setLoading(false)
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
        return <Loading/> ;
    }
    return (
        <>
        <section className="main-dashboard">

            <div className="container-fluid dash-board">

                <div className="row">

            <SidebarMain />
            <section className="container mx-auto px-4">
                <h1 className="font-bold text-3xl text-center mt-10 mb-10 text-white">
                    User List
                </h1>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="border p-4">
                                #
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Name
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Email
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Role
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Phone
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Total Points
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Remaining Points
                            </Table.HeadCell>
                            <Table.HeadCell className="border">
                                Action
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {users.map((user) => (
                                <Table.Row
                                key={user.id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="border text-center p-4">
                                        {user.id}
                                    </Table.Cell>
                                    <Table.Cell className="border text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <Link to={'/user/preview/' + user.id}>
                                                {user.first_name} {user.last_name}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell className="border text-center">
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell className="border text-center">
                                        {user.role.title}
                                    </Table.Cell>
                                    <Table.Cell className="border text-center">
                                        {user.phone}
                                    </Table.Cell>
                                    <Table.Cell className="border text-center">
                                        {user.point[0] ? user.point[0].total_points : 0}
                                    </Table.Cell>
                                    <Table.Cell className="border text-center">
                                        {user.point[0] ? user.point[0].remaining_points : 0}
                                    </Table.Cell>
                                    <Table.Cell className="border text-center">
                                        <Link
                                            to={`/user/edit/${user.id}`}
                                            className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline pr-3"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="text-center font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </section>
                                </div>
                            </div>
                        </section>
        </>
    );
}
