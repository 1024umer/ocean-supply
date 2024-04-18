import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import service from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

export default function SubscriptionForm() {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);
    const getSubscription = async () => {
        const response = await service.get(
            "http://127.0.0.1:8000/api/subscriptionList"
        );
        setSubscriptions(response.data.data);
    };

    useEffect(() => {
        getSubscription();
    }, []);

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
        console.log({ id });
        navigate(`/subscription/${id}`);
    };

    const products = subscriptions;
    return (
        <>
            <section className="container mx-auto">
                <h1 className="font-bold text-3xl text-center mt-10">
                    Subscription List
                </h1>
                <div className="grid grid-cols-1 gap-4 mt-10">

                    <div className="overflow-x-auto">
                        <Table striped>
                            <Table.Head>
                                <Table.HeadCell className="text-center">#</Table.HeadCell>
                                <Table.HeadCell className="text-center">Name</Table.HeadCell>
                                <Table.HeadCell className="text-center">Title</Table.HeadCell>
                                <Table.HeadCell className="text-center">Price</Table.HeadCell>
                                <Table.HeadCell className="text-center">Description</Table.HeadCell>
                                <Table.HeadCell className="text-center">Is Premium</Table.HeadCell>
                                <Table.HeadCell className="text-center">Is Active</Table.HeadCell>
                                <Table.HeadCell className="text-center">Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">

                            {subscriptions.map(subscription => (
                                    <Table.Row key={subscription.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="text-center">{subscription.id}</Table.Cell>
                                        <Table.Cell className="text-center">{subscription.name}</Table.Cell>
                                        <Table.Cell className="text-center">{subscription.title}</Table.Cell>
                                        <Table.Cell className="text-center">{subscription.description}</Table.Cell>
                                        <Table.Cell className="text-center">${subscription.price}</Table.Cell>
                                        <Table.Cell className="text-center">
                                            {subscription.is_premium === 1 ? (
                                                <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
                                                    Premium
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">
                                                    Not Premium
                                                </span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell className="text-center">
                                            {subscription.is_active === 1 ? (
                                                <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">
                                                    Not Active
                                                </span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell className="text-center">
                                        <Link to={`/subscription/${subscription.id}`} className="text-green-600 hover:text-green-900 border border-green-600 hover:border-green-900 px-3 rounded">Edit</Link>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </section>
        </>
    );
}
