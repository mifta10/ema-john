import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51J1RBEDVepz48gWacd9W9GC7gqYpXcvYTbjKLg8Jt4Da5T92KMrGu3YDHDg7gJKmpOvP0yq0N6DqYKinTE1EbhRR00aBYnZCb6');

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
     <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;