import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [cookies, setCookies] = useState([]);
  const [selectedCookies, setSelectedCookies] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState();
  const [numberOfCookies, setNumberOfCookies] = useState();

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(
        'https://opensheet.elk.sh/1Lfu9QGTj2cZkmfDdZdh9Bwu3i9eoK6odwdvEBSHW8IQ/1'
      );
      setCookies(res.data);
    }
    fetch();
  }, []);

  return (
    <div className='flex'>
      <div className='grow-2 cookies-column'>
        <div className='cookies-header'>
          <h3 className='text-center title'>Build your own box</h3>
          <p className='light-font'>Select your box size:</p>
          <select className='select-cookies'>
            <option>4 Pack</option>
          </select>
          <p className='light-font'>Click on a cookie to add it to your box</p>
        </div>
        <div className='cookies'>
          {cookies.map((c) => {
            return (
              <div className='cookie'>
                <img src={c.image} width='160px' />
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
          <button className='add-to-cart-btn'>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
