import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const getInventories = async () => {
        const response = await service.get("/api/inventory");
        setInventory(response.data.data);
        setLoading(false)
    };

    useEffect(() => {
        getInventories();
    }, []);
    if (loading) {
        return <Loading/> ;
    }
  return (
    <>
        <SidebarMain />
        
    </>
  )
}

export default InventoryList
