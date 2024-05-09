import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
function CreateOrder() {
    const [loading, setLoading] = useState(true);
    // if (loading) {
    //     return <Loading />;
    // }
    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />

                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateOrder
