import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import Box from "../../../components/Box";
function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const getInventories = async () => {
        const response = await service.get("/api/inventory").then(response => {
            setInventory(response.data.elements);
            setLoading(false)
        }).catch(setLoading(true));
    };

    useEffect(() => {
        getInventories();
    }, []);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <SidebarMain />
            <div className="grid grid-cols-7 gap-6 p-4 mt-4">
                {inventory.map(item => (
                    <Box key={item.id} title={item.name} total={item.price} />
                ))}
            </div>
        </>
    )
}

export default InventoryList
