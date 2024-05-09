import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import Box from "../../../components/Box";
function InventoryPreview() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const getInventories = async () => {
        const response = await service.get("/api/inventory/"+ id).then(response => {
            console.log(response.data)
            setInventory(response.data);
            setLoading(false)
        }).catch(setLoading(true));
    };
    useEffect(() => {
        getInventories();
    }, []);
    if (loading) {
        return <Loading />;
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
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Product Detail</h2>
                                <p>Id: {inventory.id}</p>
                                <p>Code: {inventory.code}</p>
                                <p>Name: {inventory.name}</p>
                                <p>Coast: {inventory.cost}</p>
                                <p>Price: ${inventory.price} {inventory.priceType}</p>
                                <p>{inventory.available == true ? "In Stock" : "Out of Stock"}</p>
                                <p>Time: {formatTimestamp(inventory.modifiedTime)}</p>
                                <p>SKU: {inventory.sku}</p>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </section>
        </>
    )
}

export default InventoryPreview
