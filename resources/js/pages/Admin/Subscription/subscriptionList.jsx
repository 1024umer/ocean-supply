import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import service from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
export default function subscriptionList() {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const getSubscription = async () => {
        try {
            const response = await service.get("/api/subscriptionList");
            setSubscriptions(response.data.data);
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
    if (loading) {
        return <Loading/> ;
    }
    return (
        <>
        <SidebarMain />
            <section className="container mx-auto px-4">
                <h1 className="font-bold text-3xl text-center mt-10 text-white " >
                    Subscription List
                </h1>
                <div className="grid grid-cols-1 gap-4 mt-10">

                    <div className="overflow-x-auto">
                    <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className="text-center border p-4">#</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Name</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Title</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Price</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Description</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Is Premium</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Is Active</Table.HeadCell>
                                <Table.HeadCell className="text-center border">Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">

                            {subscriptions.map(subscription => (
                                    <Table.Row key={subscription.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="text-center border p-4">{subscription.id}</Table.Cell>
                                        <Table.Cell className="text-center border">{subscription.name}</Table.Cell>
                                        <Table.Cell className="text-center border">{subscription.title}</Table.Cell>
                                        <Table.Cell className="text-center border">{subscription.description}</Table.Cell>
                                        <Table.Cell className="text-center border">${subscription.price}</Table.Cell>
                                        <Table.Cell className="text-center border">
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
                                        <Link to={`/subscription/${subscription.id}`} className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline pr-3">Edit</Link>
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
