import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div style={{ marginTop: '64px' }}>
      <Link to='/' className='back-btn'>
        Place New Order
      </Link>

      <div>Thank You</div>
    </div>
  );
}
