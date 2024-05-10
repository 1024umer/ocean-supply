import React from 'react'

function ProductModal({item}) {
    return (
        <>
            <div className="modal products-modal" id={"myModal"+item.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{item.name}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="product-details-modal">
                                <ul>
                                    <li>Price : $150</li>
                                    <li>Code : XXXXX</li>
                                    <li>QR Code : XXXXXXXXXXXXX</li>
                                    <li>Other Details</li>
                                </ul>
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

export default ProductModal
