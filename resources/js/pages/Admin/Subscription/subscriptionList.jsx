import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import service from "../../../config/axiosConfig";

export default function SubscriptionForm() {

    const [subscriptions, setSubscriptions] = useState([]);
    const getSubscription = async () => {
        const response = await service.get('http://127.0.0.1:8000/api/subscriptionList');
        setSubscriptions(response.data.data)
    }

    // const premiumBadge = (rowData) => {
    //     const badgeClass = rowData.is_premium === 1 ? "premium-badge" : "not-premium-badge";
    //     return <span className={badgeClass}>{rowData.is_premium === 1 ? "Premium" : "Not Premium"}</span>;
    // };

    // const activeBadge = (rowData) => {
    //     const badgeClass = rowData.is_active === 1 ? "active-badge" : "inactive-badge";
    //     return <span className={badgeClass}>{rowData.is_active === 1 ? "Active" : "Inactive"}</span>;
    // };


    useEffect(()=>{
        getSubscription()
    },[])

    const products = subscriptions
    return (
        <>
            <section className="container mx-auto">
                <h1 className="font-bold text-3xl text-center mt-10">
                    Subscription List
                </h1>
                <div className="grid grid-cols-1 gap-4 mt-10">
                <DataTable value={products} removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" sortable style={{ width: '100px' }}></Column>
                    <Column field="title" header="Title" sortable style={{ width: '100px' }}></Column>
                    <Column field="price" header="Price" sortable style={{ width: '100px' }}></Column>
                    <Column field="description" header="Description" sortable style={{ width: '100px' }}></Column>
                    <Column field="is_premium" header="Is Premium" sortable style={{ width: '100px' }}></Column>
                    <Column field="is_active" header="Is Active" sortable style={{ width: '100px' }} ></Column>
                </DataTable>

                </div>
            </section>
        </>
    );
}
