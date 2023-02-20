import axios from 'axios';
import { useEffect, useState } from 'react';
import CheckoutPage from './CheckoutPage';
import ThankYou from './ThankYou';

export default function Home() {
  const [cookies, setCookies] = useState([]);
  const [selectedCookies, setSelectedCookies] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [numberOfCookies, setNumberOfCookies] = useState(6);
  const [cartCookies, setCartCookies] = useState([]);
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(
        'https://opensheet.elk.sh/1_3Jo6v1EvlNaDMPucxyUY_EKKX8JVzjdO4J1UpmfumE/1'
      );
      setCookies(res.data);
    }
    fetch();
  }, []);

  useEffect(() => {
    setCartCookies([...new Set(selectedCookies.map((x) => x))]);
  }, [selectedCookies]);

  const checkCount = (c) => {
    return selectedCookies.filter((d) => d.title === c.title).length;
  };

  const handleRemove = (c) => {
    const index = selectedCookies.findIndex((x) => x.title === c.title);
    if (
      index > -1 &&
      selectedCookies.indexOf(selectedCookies[index]) === index
    ) {
      setSelectedCookies([
        ...selectedCookies.slice(0, index),
        ...selectedCookies.slice(index + 1),
      ]);
    }
  };

  if (checkoutDone) {
    return <ThankYou />;
  }

  if (checkoutReady) {
    return (
      <CheckoutPage
        cookies={selectedCookies}
        onUpdateCheckoutReady={() => {
          setCheckoutReady(false);
        }}
      />
    );
  }

  return (
    <div className='flex order-cookies'>
      <div className='grow-2 cookies-column'>
        <div className='cookies-header'>
          <p className='light-font'>Select 6 Cookies of your Choice</p>
          <h3 className='text-center title'>Build your own box</h3>
          {/* <select className='select-cookies'>
            <option>4 Pack</option>
          </select> */}
          <p className='light-font'>Click on a cookie to add it to your box</p>
        </div>
        <div className='cookies'>
          {cookies.map((c) => {
            return (
              <div
                key={c.title}
                className='cookie'
                onClick={() => {
                  if (selectedNumber < numberOfCookies) {
                    setSelectedCookies([...selectedCookies, c]);
                    setSelectedNumber(selectedNumber + 1);
                  }
                  checkCount(c);
                }}
              >
                {checkCount(c) ? (
                  <div className='cookie-counter'>{checkCount(c)}</div>
                ) : (
                  <div></div>
                )}
                <img src={c.image} width='130px' />
                <p className='cookie-title'>{c.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className='grow-1 
cookie-gathering-column'
      >
        <div className='cookies-header'>
          <h3 className='text-center title box-title'>Your Box</h3>
          <p className=''>{selectedNumber + '/' + numberOfCookies}</p>
          {selectedNumber === 6 ? (
            <p className='light-font'>You can checkout now</p>
          ) : (
            <p className='light-font'>Select 6 cookies to enable checkout</p>
          )}
          <button
            onClick={() => {
              selectedNumber === 6
                ? setCheckoutReady(true)
                : setCheckoutReady(false);
            }}
            className={
              selectedNumber === 6
                ? 'add-to-cart-btn'
                : 'add-to-cart-btn disabled'
            }
          >
            Checkout
          </button>
        </div>
        <div className='cart-cookies'>
          {cartCookies.map((c) => {
            return (
              <div className='cart-cookie'>
                <img src={c.image} width='130px' />
                <p className='cookie-title'>{c.title}</p>
                <div className='counter'>
                  <div
                    className='plus'
                    onClick={() => {
                      if (selectedNumber < numberOfCookies) {
                        setSelectedCookies([...selectedCookies, c]);
                        setSelectedNumber(selectedNumber + 1);
                      }
                      checkCount(c);
                    }}
                  >
                    +
                  </div>
                  {checkCount(c)}
                  <div
                    className='minus'
                    onClick={() => {
                      handleRemove(c);
                      setSelectedNumber(selectedNumber - 1);
                      checkCount(c);
                    }}
                  >
                    -
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
