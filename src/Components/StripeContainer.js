import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { CheckoutForm } from './CheckoutForm';

const PUBLIC_KEY =
  'pk_test_51JYW5fAUJtCKmWZEr8em2ohJlgByEVLBApJyH9oGzQzNFCnLbQUOfiyJ6dmzzfhawb35GA9oJpTWxpqcwfoT2jb900WiNeFrEL';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
