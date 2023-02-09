import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [cookies, setCookies] = useState([]);
  const [selectedCookies, setSelectedCookies] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [numberOfCookies, setNumberOfCookies] = useState(6);
  const [cartCookies, setCartCookies] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(
        'https://opensheet.elk.sh/1Lfu9QGTj2cZkmfDdZdh9Bwu3i9eoK6odwdvEBSHW8IQ/1'
      );
      setCookies(res.data);
    }
    fetch();
  }, []);

  useEffect(() => {
    setCartCookies([...new Set(selectedCookies.map((x) => x))]);
    console.log(cartCookies);
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

  return (
    <div className='flex'>
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
          <button className='add-to-cart-btn'>Add to Cart</button>
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
