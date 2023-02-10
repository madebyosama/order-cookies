import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [buttonTitle, setButtonTitle] = useState('Place Order');
  const [buttonClass, setButtonClass] = useState('submit-btn');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonTitle('Proccessing...');
    setButtonClass('submit-btn disable-btn');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          'https://order-cookies-server.vercel.app/stripe/charge',
          {
            amount: 3500,
            id: id,
          }
        );

        console.log('Stripe 35 | data', response.data.success);
        if (response.data.success) {
          navigate('/thankyou');
          setButtonTitle('Proccessing');
          console.log('CheckoutForm.js 25 | payment successful!');
        }
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
        setButtonTitle('Place Order');
        setButtonClass('submit-btn');
      }
    } else {
      console.log(error.message);
      setButtonTitle('Place Order');
      setButtonClass('submit-btn');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      {buttonTitle === 'Place Order' ? (
        <button className={buttonClass}>{buttonTitle}</button>
      ) : (
        <p className='disable-btn'>Proccessing...</p>
      )}
    </form>
  );
};
