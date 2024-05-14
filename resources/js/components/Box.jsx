import React from 'react'
import { Card } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addMultipleToCart, addToCart, clearItemFromCart } from '../redux/cart/cartSlice';
import ProductModal from './ProductModal';
function Box({ title, total, item }) {
    const dispatch = useDispatch();
    const handleBoxClick = (product) => {
        console.log("clicked", product);
        dispatch(addToCart(product));
    };

    return (
        <>
            <div className="box-check" onClick={() => handleBoxClick(item)}>
                <input type="checkbox" id={'vehicle1'+item.id} name="vehicle1" value="Bike" />
                <label htmlFor={'vehicle1'+item.id}>
                    <div className="pro-details">
                        <h6>{title}</h6>
                        <div className="code-price">
                            <p>Code : {item.code}</p>
                            <p>Price : ${total}</p>
                        </div>
                        <div className="in-stock-or-not">
                            <p>{item.available === true ? "In Stock" : "Out of Stock"}</p>
                        </div>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#myModal"+item.id}>
                            <img src="/front/images/modal-plus-icon.png" alt="" />
                        </button>
                    </div>
                </label>
            </div>
            <ProductModal item={item} />
        </>
    )
}
export default Box
