import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link ,useParams } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import Box from "../../../components/Box";
import { useSelector } from "react-redux";

function GetPayment() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState([]);

    const setPayments = async () => {
        const response = await service.get(`/api/getAllPayment/${id}`);
        setPayment(response.data.elements);
    };
    useEffect(() => {
        if(id){
            setPayments();
        }
        setLoading(false);
    }, [id]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div className="row dashboard-right-top-sec">
                                <div className="col-lg-12">
                                    <div className="main-user-box userlist-box">
                                        <div className="two-align-thing">
                                            <h3>Payment</h3>
                                        </div>
                                        <div className="table-box">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Payment ID</th>
                                                        <th>Order ID</th>
                                                        <th>Payment Amount</th>
                                                        <th>Tax Amount</th>
                                                        <th>Cash Tendered</th>
                                                        <th>Status</th>
                                                        <th>Payment Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payment.length > 0 &&
                                                        <tr>
                                                            <td>{payment[0].id}</td>
                                                            <td>{payment[0].order.id}</td>
                                                            <td>{payment[0].amount}</td>
                                                            <td>{payment[0].taxAmount}</td>
                                                            <td>{payment[0].cashTendered}</td>
                                                            <td>{payment[0].result}</td>
                                                            <td>{formatTimestamp(payment[0].amount)}</td>
                                                        </tr>
                                                    }
                                                    {payment.length === 0 && <tr><td>No payment found</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="img-abs">
                                            <img
                                                className="user-list-img-top"
                                                src="/front/images/user-list-img-top.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row footer-row">
                                <div className="col-md-12">
                                    <div className="dash-board-footer">
                                        <div className="two-align-box">
                                            <p>
                                                © 2024 | All Rights Are Reserved
                                            </p>
                                            <ul>
                                                <li>
                                                    <a href="#">Facebook</a>
                                                </li>
                                                <li>
                                                    <a href="#">Instagram</a>
                                                </li>
                                                <li>
                                                    <a href="#">Twitter</a>
                                                </li>
                                                <li>
                                                    <a href="#">LinkedIn</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default GetPayment;
