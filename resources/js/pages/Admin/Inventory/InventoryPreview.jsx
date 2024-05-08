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
                    <Link to={'/inventory/'+ item.id}>
                        <Box key={item.id} title={item.name} total={item.price} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default InventoryPreview
