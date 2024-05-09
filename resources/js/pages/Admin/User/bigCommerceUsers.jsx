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

export default function BigCommerceUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const response = await service.get("/api/getBigCommerceUsers");
        console.log(response);
        setUsers(response.data.data);
        setLoading(false)
    };

    useEffect(() => {
        getUsers();
    }, []);
    if (loading) {
        return <Loading/> ;
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
                    <section className="container mx-auto px-4">
                        <h1 className="font-bold text-3xl text-center mt-10 mb-10 text-white">
                            User List
                        </h1>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell className="border text-center p-4">
                                        #
                                    </Table.HeadCell>
                                    <Table.HeadCell className="border text-center">
                                        Name
                                    </Table.HeadCell>
                                    <Table.HeadCell className="border text-center">
                                        Email
                                    </Table.HeadCell>
                                    <Table.HeadCell className="border text-center">
                                        Phone
                                    </Table.HeadCell>
                                    <Table.HeadCell className="border text-center">
                                        Date Created
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
                                                        {user.first_name} {user.last_name}
                                            </Table.Cell>
                                            <Table.Cell className="border text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {user.email}
                                            </Table.Cell>
                                            <Table.Cell className="border text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {user.phone}
                                            </Table.Cell>
                                            <Table.Cell className="border text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {formatTimestamp(user.date_created)}
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
