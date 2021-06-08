import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {

  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] =useState(false)
  const history = useHistory();
  const handleCheckout = () => {
    history.push('/shipment');
  }

  const removeProduct = (productKey) => {
    console.log("remove clicked", productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }

  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, [])

  let thankYou;
  if(orderPlaced) {
  thankYou = <img src={happyImg} alt=""/>
  }
  return (
    <div className="shop-container">
      <div className="products-container">

        {
          cart.map(pd =>
            <ReviewItem
              key={pd.key}
              product={pd}
              removeProduct={removeProduct}
            ></ReviewItem>)
        }
        {
          thankYou
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button className="main-btn" onClick={handleCheckout}>Proceed To Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;