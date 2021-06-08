import React from 'react';

const ReviewItem = (props) => {
  const {name, quantity ,key,price} = props.product;
  const reviewItemStyle= {
    borderBottom: '1px solid gray',
    marginBottom: '10px',
    padding: '5px',
    marginLeft: '10px'
  }
  return (
    <div style={reviewItemStyle} className="review-item">
      <h5 className="product-name">{name}</h5>
      <p>Quantity: {quantity}</p>
      <p><small>${price}</small></p>
      <button 
      className="main-btn"
      onClick={() => props.removeProduct(key)}
      >Remove</button>
    </div>
  );
};

export default ReviewItem;