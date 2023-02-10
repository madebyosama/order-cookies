import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Checkout(props) {
  const form = useRef();
  const { cookies } = props;
  const [cartCookies, setCartCookies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState();
  const updateCheckoutReady = () => {
    props.onUpdateCheckoutReady();
  };

  useEffect(() => {
    setCartCookies([...new Set(cookies.map((x) => x))]);
    console.log(cookies);
  }, []);

  const checkCount = (c) => {
    return cookies.filter((d) => d.title === c.title).length;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm('checkout', 'checkout', form.current, 'oODAFM08o-ckYKNX_')
      .then(
        (result) => {
          if (result.text === 'OK') {
            setIsSubmitted('yes');
            setIsSubmitting(false);
          } else {
            setIsSubmitted('no');
            setIsSubmitting(false);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className='checkout'>
      <button className='back-btn' onClick={updateCheckoutReady}>
        Back
      </button>
      <div className='checkout-page'>
        <div className='checkout-form'>
          <form className='form' ref={form}>
            <label>General Information</label>
            <input placeholder='Name' required />
            <input placeholder='Email' required />
            <input placeholder='Phone' required />
            <span className='space-top-24'></span>
            <label>Shipping Information</label>
            {/* <h3>Address</h3> */}
            <input placeholder='Address Line 1' required />
            <input placeholder='Address Line 2' />
            <div className='flex'>
              <input
                placeholder='City'
                className='half-input'
                style={{ marginRight: '8px' }}
                required
              />
              <input placeholder='State' className='half-input' required />
            </div>
            <input placeholder='Zipcode' required />
            <span className='space-top-24'></span>
            <label>Other</label>
            <textarea placeholder='Notes' />
            <span className='space-top-24'></span>
            <label>Payment Method</label>
            <textarea placeholder='Notes' />

            <input type='submit' className='submit-btn' value='Place Order' />
          </form>
        </div>
        <div className='detail-section'>
          <h3 className='text-center title detail-title '>Your Box</h3>
          <div className='cookies details-cookies'>
            {cartCookies.map((c) => {
              return (
                <div key={c.title} className='detail-cookie'>
                  <div>
                    <img src={c.image} width='100px' />
                  </div>
                  <div>
                    <p className='detail-cookie-title'>{c.title}</p>
                  </div>
                  <div>
                    <p className='detail-cookie-title'>X</p>
                  </div>
                  <div>
                    <div className='detail-cookie-title'>{checkCount(c)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
