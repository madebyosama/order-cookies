import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className='thankyou'>
      <div style={{ fontSize: '64px' }}>🎉</div>
      <div
        style={{
          fontSize: '24px',
          paddingBottom: '24px',
          paddingTop: '24px',
          fontWeight: 600,
        }}
      >
        We've got your order!
      </div>
      <div style={{ paddingBottom: '24px' }}>
        {' '}
        Please check your email for a confirmation
      </div>
      <div> Thank You for Choosing Gou-oui Cookies</div>
      <div className='back'>
        <Link to='/' className='back-btn'>
          Place New Order
        </Link>
      </div>
    </div>
  );
}
