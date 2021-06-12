import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App'
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
   setShippingData(data)
  }

  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = { 
      ...loggedInUser, 
      products: savedCart, 
      shipment: shippingData, 
      paymentId,
      orderTime: new Date() }
      fetch('https://shrouded-escarpment-86917.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert("Your Order Placed Successfully");
        }
      })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">This field is required</span>}

          <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">This field is required</span>}

          <input name="address" {...register("address", { required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">This field is required</span>}
          <input name="phone" {...register("phone", { required: true })} placeholder="Your Phone" />
          {errors.phone && <span className="error">This field is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
          <h2>Please pay for me</h2>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;