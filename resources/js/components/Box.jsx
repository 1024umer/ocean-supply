import React from 'react'
import { Card } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addMultipleToCart, addToCart } from '../redux/cart/cartSlice';
function Box({title,total,item}) {
    const dispatch = useDispatch();
    const handleBoxClick = (product) => {
        console.log(product)
        dispatch(addToCart(product));
    };
  return (
    <Card href="#" className="max-w-sm" onClick={() => handleBoxClick(item)}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {total}
      </p>
    </Card>
  )
}
export default Box
