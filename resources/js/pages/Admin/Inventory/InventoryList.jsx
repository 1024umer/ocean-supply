import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import Box from "../../../components/Box";
import { useSelector } from "react-redux";

function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const {cart} = useSelector(state=> state.cart);
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
                                <Box key={item.id} title={item.name} total={item.price} item={item}  />
                             </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default InventoryList
