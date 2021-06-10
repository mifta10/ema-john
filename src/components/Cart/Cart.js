import React from 'react';
import {Link} from 'react-router-dom'
import './Cart.css'

const Cart = (props) => {
  const cart = props.cart;
  
  const total = cart.reduce((total , prd) => total + prd.price * prd.quantity || 1, 0)
  let shipping = 0;
  if(total > 35){
    shipping =0;
  }
  else if (total > 0){
    shipping = 12.99;
  }
  else if (total >15){
    shipping = 4.99;
  }

  const tax = (total/10);
  const tb = total+ shipping;
  const grandTotal = total + shipping + tax;

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision)
  }

  return (
    <div className="container">
        <h3 className="text-danger">Order Summary</h3>
        <p className="items">Items Ordered:{cart.length}</p>
        <p><small>Items:${formatNumber(total)}</small></p>
        <p><small>Shipping & Handling: ${formatNumber(shipping)}</small></p>
        <p><small>Total Before Tax: ${formatNumber(tb)}</small></p>
        <p><small>Tax: ${formatNumber(tax)}</small></p>
        <h4 className="order-total">Order Total: ${formatNumber(grandTotal)}</h4>
        {
        props.children
        }
    </div>
  );
};

export default Cart;