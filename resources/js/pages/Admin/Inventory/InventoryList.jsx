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
    const { cart } = useSelector(state => state.cart);
    const getInventories = async () => {
        const response = await service.get("/api/inventory").then(response => {
            setInventory(response.data.elements);
            setLoading(false)
        }).catch(setLoading(true));
    };
    useEffect(() => {
        getInventories();
    }, []);
    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                    {(loading && <Loading />) || (
                            <>
                                <SidebarMain />
                    {/* {loading ? <Loading /> : <SidebarMain />} */}
                        <div className="col-lg-9 col-md-9 dashboard-right-sec products-sec  ">
                            <div className="row dashboard-right-top-sec">
                                <div className="col-lg-12">
                                    <div className="products-search-box">
                                        <h3>Products</h3>
                                        <div className="input-and-btn-box">
                                            <div className="input-box">
                                                <label>Category</label>
                                                <input type="search" placeholder="Search" />
                                            </div>
                                            <div className="btn-box">
                                                <a href="#">Search</a>
                                                <Link to="/order">Create Order</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="products select-check-box">
                                        <form action="">
                                            <div className="many-check-boxes">
                                                {inventory.map(item => (
                                                    <Box key={item.id} title={item.name} total={item.price} item={item} />
                                                ))}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                    </div>
                </div>
            </section >
        </>
    )
}

export default InventoryList
