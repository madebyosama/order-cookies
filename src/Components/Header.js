import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        <div>
          <ul className='header-l-menu'>
            <li className='header-item-list'>
              <a href='' className='header-item'>
                Home
              </a>
              <a href='' className='header-item'>
                About
              </a>
              <a href='' className='header-item'>
                Faqs
              </a>
            </li>
          </ul>
        </div>
        <div className='header-logo'>
          <a href=''>
            <img
              src='https://res.cloudinary.com/dvwpbbisf/image/upload/v1674544366/jyl8lm0psjwd5gplxuce.png'
              width='200px'
            />
          </a>
        </div>
        <div>
          <ul className='header-r-menu'>
            <li className='header-item-list'>
              <a href='' className='header-item'>
                Cookies
              </a>
              <a href='' className='header-item'>
                Contact
              </a>
              <a href='' className='header-item'>
                Order
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
