import React from 'react'

function CustomerDetailsModal({customer, status}) {

    const modalClose = (id) => {
        document.getElementById('customerModal'+id).style.display = 'none';
    }
    return (
        <>
            <div className={'modal products-modal new show'} style={{ display: status }} id={"customerModal"+customer.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Customers</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="product-details-modal">
                                    <div className="product-details-modal" key={customer.id}>
                                        <ul>
                                            <li>Id : {customer.id}</li>
                                            <li>Name : {customer.firstName + " " + customer.lastName}</li>
                                            <li>Email : {customer.emailAddresses.elements.find(email => email.primaryEmail).emailAddress}</li>
                                            {customer.phoneNumbers.elements.find(phone => phone.primaryPhone) ? (
                                            <li>Phone : {customer.phoneNumbers.elements.find(phone => phone.primaryPhone).phoneNumber}</li>
                                            ) : (
                                                <li>Phone : N/A</li>
                                            )}
                                        </ul>
                                    </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={() => modalClose(customer.id)} data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerDetailsModal
