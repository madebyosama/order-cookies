import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './Components/CheckoutForm';

const PUBLIC_KEY =
  'pk_test_51JYW5fAUJtCKmWZEr8em2ohJlgByEVLBApJyH9oGzQzNFCnLbQUOfiyJ6dmzzfhawb35GA9oJpTWxpqcwfoT2jb900WiNeFrEL';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function Checkout(props) {
  const { cookies } = props;
  const [cartCookies, setCartCookies] = useState([]);

  const [allFilled, setAllFilled] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [addressLineOne, setAddressLineOne] = useState();
  const [addressLineTwo, setAddressLineTwo] = useState('');
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipcode, setZipcode] = useState();
  const [notes, setNotes] = useState('');
  const [validEmail, setValidEmail] = useState('Not Entered');

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

  let handleEmail = (email) => {
    // don't remember from where i copied this code, but this works.
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      setValidEmail('Correct Email');
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      setAllFilled(true);
    } else {
      console.log(validEmail);
      setValidEmail('False Email');
      // invalid email, maybe show an error to the user.
    }
  };

  return (
    <div className='checkout'>
      <div className='checkout-page'>
        <div className='checkout-form'>
          {allFilled ? (
            <div>
              <button className='back-btn' onClick={() => setAllFilled(false)}>
                Back
              </button>
              <br />
              <br />
              <label>Payment</label>
              <div className='space-top-24'></div>
              <Elements stripe={stripeTestPromise}>
                <CheckoutForm
                  name={name}
                  email={email}
                  phone={phone}
                  addressLineOne={addressLineOne}
                  addressLineTwo={addressLineTwo}
                  city={city}
                  state={state}
                  zipcode={zipcode}
                  note={notes}
                />
              </Elements>
            </div>
          ) : (
            <div>
              <button className='back-btn' onClick={updateCheckoutReady}>
                Back
              </button>
              <br />
              <br />

              <div className='span-top-24'></div>
              <form
                className='form'
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label>General Information</label>
                <input
                  placeholder='Name'
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <input
                  placeholder='Email'
                  type='email'
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <input
                  placeholder='Phone'
                  value={phone}
                  type='number'
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <span className='space-top-24'></span>
                <label>Shipping Information</label>
                {/* <h3>Address</h3> */}
                <input
                  placeholder='Address Line 1'
                  value={addressLineOne}
                  required
                  onChange={(e) => {
                    setAddressLineOne(e.target.value);
                  }}
                />
                <input
                  placeholder='Address Line 2'
                  value={addressLineTwo}
                  onChange={(e) => {
                    setAddressLineTwo(e.target.value);
                  }}
                />
                <div className='flex'>
                  <input
                    placeholder='City'
                    value={city}
                    className='half-input'
                    style={{ marginRight: '8px' }}
                    required
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                  <input
                    placeholder='State'
                    value={state}
                    className='half-input'
                    required
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
                <input
                  placeholder='Zipcode'
                  value={zipcode}
                  type='number'
                  required
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
                <span className='space-top-24'></span>
                <label>Other</label>
                <textarea
                  placeholder='Notes'
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                />
                {validEmail === 'Correct Email' ||
                validEmail === 'Not Entered' ? (
                  ''
                ) : (
                  <p style={{ color: 'Red' }}>Email is not valid.</p>
                )}
                <input
                  type='submit'
                  className='submit-btn'
                  value='Pay Now'
                  onClick={(e) => {
                    if (
                      (name, email, phone, addressLineOne, city, state, zipcode)
                    ) {
                      handleEmail(email);
                    }
                  }}
                />
              </form>
            </div>
          )}
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
