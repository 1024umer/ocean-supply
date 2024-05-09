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
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />

                        {inventory.map(item => (
                            <Link to={'/inventory/' + item.id}>
                                <Box key={item.id} title={item.name} total={item.price} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default InventoryList
