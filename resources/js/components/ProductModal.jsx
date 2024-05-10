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
                                    <li>Id : {item.id}</li>
                                    <li>Code : {item.code}</li>
                                    <li>Price : ${item.price}</li>
                                    <li>Price Type : {item.priceType}</li>
                                    <li>Cost : ${item.cost}</li>
                                    <li>SKU : {item.sku}</li>
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
