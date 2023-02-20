import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import emailjs from '@emailjs/browser';

export const CheckoutForm = (props) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const form = useRef();

  const elements = useElements();
  const [buttonTitle, setButtonTitle] = useState('Pay Now');
  const [buttonClass, setButtonClass] = useState('submit-btn');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState();

  const sendEmail = () => {
    setButtonTitle('Successful');
    setIsSubmitting(true);
    emailjs
      .sendForm('checkout', 'checkout', form.current, 'oODAFM08o-ckYKNX_')
      .then(
        (result) => {
          if (result.text === 'OK') {
            setIsSubmitted('yes');
            setIsSubmitting(false);
            navigate('/thankyou');
          } else {
            alert(
              'Payment Send but Details not sent. Please contact us for more information.'
            );
            setIsSubmitted('no');
            setIsSubmitting(false);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonTitle('Proccessing...');
    setButtonClass('submit-btn disable-btn');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        address: {
          city: props.city,
          line1: props.addressLineOne,
          line2: props.addressLineTwo,
          postal_code: props.zipcode,
          state: props.state,
        },
        email: props.email,
        name: props.name,
        phone: props.phone,
      },
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          'https://gou-oui-server.madebyosama.com/stripe/charge',
          {
            amount: 3500,
            id: id,
          }
        );

        console.log('Stripe 35 | data', response.data.success);
        if (response.data.success) {
          sendEmail();
          setButtonTitle('Proccessing');
          console.log('CheckoutForm.js 25 | payment successful!');
        }
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
        setButtonTitle('Pay Now');
        setButtonClass('submit-btn');
      }
    } else {
      console.log(error.message);
      setButtonTitle('Pay Now');
      setButtonClass('submit-btn');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input placeholder='Name on Card' name='card-name' />
        <CardElement />
        {buttonTitle === 'Pay Now' ? (
          <button className={buttonClass}>{buttonTitle}</button>
        ) : (
          <p className='disable-btn'>Proccessing...</p>
        )}
      </form>
      <form
        style={{ display: 'none' }}
        ref={form}
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Billing Information</label>
        <input placeholder='Name' name='name' required value={props.name} />
        <input placeholder='Email' name='email' required value={props.email} />
        <input placeholder='Phone' name='phone' required value={props.phone} />
        <span className='space-top-24'></span>
        <label>Shipping Information</label>
        {/* <h3>Address</h3> */}
        <input
          placeholder='Address Line 1'
          name='addressLineOne'
          required
          value={props.addressLineOne}
        />
        <input
          placeholder='Address Line 2'
          name='addressLineTwo'
          value={props.addressLineTwo}
        />
        <div className='flex'>
          <input
            placeholder='City'
            name='city'
            className='half-input'
            style={{ marginRight: '8px' }}
            required
            value={props.city}
          />
          <input
            placeholder='State'
            name='state'
            className='half-input'
            required
            value={props.state}
          />
        </div>
        <input
          placeholder='Zipcode'
          name='zipcode'
          required
          value={props.zipcode}
        />
        <input name='cookie1' value={props.cookies[0].title + ' x ' + 1} />
        <input name='cookie2' value={props.cookies[1].title + ' x ' + 1} />
        <input name='cookie3' value={props.cookies[2].title + ' x ' + 1} />
        <input name='cookie4' value={props.cookies[3].title + ' x ' + 1} />
        <input name='cookie5' value={props.cookies[4].title + ' x ' + 1} />
        <input name='cookie6' value={props.cookies[5].title + ' x ' + 1} />
        <span className='space-top-24'></span>
        <label>Other</label>
        <textarea placeholder='Notes' name='notes' value={props.notes} />
        <input type='submit' className='submit-btn' value='Pay Now' />
      </form>
    </div>
  );
};
