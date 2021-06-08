import React, { useEffect, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
  // console.log(fakeData);
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10)
  const [cart, setCart] = useState([])

  useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const previousCart = productKeys.map(existingKey => {
        const product = fakeData.find(pd => pd.key === existingKey);
        console.log(existingKey, savedCart[existingKey])
        product.quantity = savedCart[existingKey];
        return product
      })
     setCart(previousCart);
  },[])

  const handleAddProduct = (product) => {
    //console.log("Product added",product);
    const tobeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === tobeAddedKey);
    let count = 1;
    let newCart;
    if(sameProduct){
       count = sameProduct.quantity + 1;
       sameProduct.quantity = count;
       const others = cart.filter(pd => pd.key !== tobeAddedKey);
       newCart = [...others, sameProduct]
    }
    else{
      product.quantity = 1;
      newCart = [...cart, product]
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  }

  return (
    <div className="shop-container">
      <div className="products-container">

        {
          products.map(pd => <Product
             key = {pd.key}
             showAddToCart={true}
             handleAddProduct={handleAddProduct}
             product={pd}></Product>)
        }

      </div>
      <div className="cart-container">
       <Cart cart={cart}>
        <Link to="/review">
          <button className="main-btn">Review Your Order</button>
        </Link>
       </Cart>
      </div>
    </div>
  );
};

export default Shop;