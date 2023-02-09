import { useEffect, useState } from 'react';

export default function Checkout(props) {
  const { cookies } = props;
  const [cartCookies, setCartCookies] = useState([]);
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

  return (
    <div className='checkout'>
      <button className='back-btn' onClick={updateCheckoutReady}>
        Back
      </button>
      <div className='cookies'>
        {cartCookies.map((c) => {
          return (
            <div key={c.title} className='cookie'>
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
      <div className='form'></div>
    </div>
  );
}
