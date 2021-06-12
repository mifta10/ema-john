import React, { useEffect, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(() => {
    fetch('https://shrouded-escarpment-86917.herokuapp.com/products?search='+search)
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [search])

  useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      fetch('https://shrouded-escarpment-86917.herokuapp.com/productByKeys',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(productKeys)
      })
      .then(res => res.json())
      .then(data => setCart(data))
    }, []);

    const handleSearch = event =>{
      setSearch(event.target.value);
    }

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
        <input type="text" onBlur={handleSearch} className="product-search" placeholder="Search Product" />
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