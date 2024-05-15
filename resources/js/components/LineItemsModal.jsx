import React from 'react'

function LineItemsModal({LineItems}) {
    return (
        <>
            <div className="modal products-modal" id={"myModal"+LineItems.elements[0].id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Products</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="product-details-modal">
                                {LineItems.elements.map((item) => (
                                    <div className="product-details-modal" key={item.id}>
                                        <hr />
                                        <ul>
                                            <li>Id : {item.id}</li>
                                            <li>Name : {item.name}</li>
                                            <li>Price : ${item.price}</li>
                                            <li>Quantity : {item.unitQty??0}</li>
                                        </ul>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineItemsModal
