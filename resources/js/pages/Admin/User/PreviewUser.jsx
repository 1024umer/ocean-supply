import React, { useEffect, useState } from "react";
import SidebarMain from "../../../components/SidebarMain";
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from "../../../config/axiosConfig";
import { Table } from "flowbite-react";

export const PreviewUser = () => {
    const [orders, setOrders] = useState([]);

    const { id } = useParams();

    const getOrders = async () => {
        const response = await service.get("/api/order/" + id);
        setOrders(response.data.data.elements);
    };
    useEffect(() => {
        getOrders();
    }, [id]);
    return (
        <>
            <SidebarMain />
            <div className="overflow-x-auto w-full lg:p-5 mt-5">
                <h2 className="text-xl font-bold my-3">Your Orders</h2>
                <Table hoverable>
                    <Table.Head>
                        {/* <Table.HeadCell>#</Table.HeadCell> */}
                        <Table.HeadCell>Product name</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Details</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {orders.map(order => {
                            console.log(order);
                            return (
                                <Table.Row key={order.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    {/* <Tabel.Cell>{order.id}</Tabel.Cell> */}
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {order.lineItems ? order.lineItems.elements[0].name : ''}
                                    </Table.Cell>
                                    <Table.Cell>${order.total}</Table.Cell>
                                    <Table.Cell>{new Date(order.createdTime).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={'/order/'+order.id}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            View Details
                                        </Link>

                                    </Table.Cell>
                                </Table.Row>
                            )

                        })}
                    </Table.Body>
                </Table>
            </div>
        </>
    );
};