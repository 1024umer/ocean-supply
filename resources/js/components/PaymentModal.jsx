import React, { useEffect, useState } from "react";
import service from "../config/axiosConfig";

function PaymentModal({ orderId }) {
    const [payment, setPayment] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPayment = async (orderId) => {
            try {
                const response = await service.get(`/api/getAllPayment/${orderId}`);
                setPayment(response.data.elements);
            } catch (error) {
                setError("Error fetching payment data.");
                console.error(error);
            }
        };

        getPayment(orderId);
    }, [orderId]);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return ""; // Handle case when timestamp is not available
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    return (
        <>
            <div className="modal products-modal" id={"myModal" + orderId}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Payment Details</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            {error && <p>{error}</p>}
                            {payment.length === 0 && <p>No payment data available.</p>}
                                {payment.map((paymentItem, index) => (
                                    <div key={index}>
                                        <ul>
                                            <li>#: {paymentItem.id}</li>
                                            <li>Amount: {paymentItem.amount}</li>
                                            <li>Cash Tendered: {paymentItem.cashTendered}</li>
                                            <li>Date: {formatTimestamp(paymentItem.createdTime)}</li>
                                            <li>Tax Amount: {paymentItem.taxAmount}</li>
                                            <li>Status: {paymentItem.result}</li>
                                            <li>Tender Id: {paymentItem.tender.id}</li>
                                        </ul>
                                    </div>
                                ))}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentModal;
