import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import service from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import { Spinner } from "flowbite-react";

export default function Slip() {
    const { id } = useParams();

    const [order, setOrder] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service
            .get(`/api/order/show/${id}`)
            .then((response) => {
                setLoading(false);
                setOrder(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    const printPage = () => {
        window.print();
    };

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 dashboard-right-sec">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-main-design add-new-lp-charges admin-profile">
                                        <h2 className="form-main-heading text-center mt-5">
                                            Order Slip
                                        </h2>
                                        {loading ? 
                                        <div className="flex justify-center items-center h-screen text-center m-auto">
                                            <Spinner aria-label="Center-aligned spinner example" size="xl" />
                                        </div> :
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="box">
                                                <h3 className="text-center mb-3">Products</h3>
                                                
                                                <table className="table text-center">
                                                    {order.lineItems && order.lineItems.elements.map((product, index) => (
                                                        <tr key={index}>
                                                            <td className="text-left">{product.name} <small>x{product.unitQty}</small></td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                            <td className="text-right">${product.price}</td>
                                                        </tr>
                                                    ))}
                                                </table>
                                                <hr className="text-center" style={{
                                                    border: "none",
                                                    borderTop: "1px dashed #015579",
                                                    width: "100%"
                                                }} />
                                                <table className="table text-center">
                                                    <tr>
                                                        <td className="text-left">Total Taxes</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="text-right">${order.payments && order.payments.elements[0].taxAmount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left">Cash Back</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="text-right">${order.payments && order.payments.elements[0].cashbackAmount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left text-success">{order.discounts && order.discounts.elements[0].name}</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="text-right text-success">${order.discounts && order.discounts.elements[0].amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left" style={{ fontWeight: 'bold' }}>Order Total</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="text-right" style={{ fontWeight: 'bold' }}>${order.total}</td>
                                                    </tr>
                                                </table>
                                                
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <h2 className="form-main-heading text-start">Total Paid</h2>
                                                    <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                                                    <h2 className="form-main-heading text-end">${order.payments && order.payments.elements[0].cashTendered}</h2>
                                                </div>
                                                
                                                <p>{formatTimestamp(order.createdTime)}</p>
                                                <p>Order ID: {order.id}</p>
                                                <p>Order Customer: {order.customers && order.customers.elements[0].firstName + " " + order.customers.elements[0].lastName}</p>
                                                <p className="mb-2">Note: {order.note}</p>

                                                <hr className="text-center" style={{
                                                    border: "none",
                                                    borderTop: "1px dashed #015579",
                                                    width: "100%"
                                                }} />

                                                <h2 className="mt-2 mb-2">Payment</h2>
                                                <table className="text-center mb-2">
                                                    <tr>
                                                        <td className="text-left">CASH GIVEN</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="text-right">${order.payments && order.payments.elements[0].cashTendered}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left">CASH PAID</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="text-right text-success">${order.payments && order.payments.elements[0].cashTendered}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left">STATUS</td>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        {/* <td className="text-right">{order.paymentState}</td> */}
                                                        <td className="text-right" style={order.lineItems && order.lineItems.elements[0].refunded === true ? {color: '#dc3545'} : {color: '#28a745'}}>{order.lineItems && order.lineItems.elements[0].refunded === true ? "Refunded" : "Paid"}</td>
                                                    </tr>
                                                </table>

                                                <hr className="text-center" style={{
                                                    border: "none",
                                                    borderTop: "1px dashed #015579",
                                                    width: "100%"
                                                }} />

                                            </div>
                                        </div>


                                        }
                                            <button className="t-btn t-btn-gradient" style={{ fontSize:'25px', width:'80px', height:'50px' }} onClick={printPage}>Print</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}
