import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <div className='header'>
      <div className='header-content'>
        <div>
          <ul className='header-l-menu'>
            <li className='header-item-list'>
              <a href='https://https://gou-oui.com/' className='header-item'>
                Home
              </a>
              <a
                href='https://https://gou-oui.com/about/'
                className='header-item'
              >
                About
              </a>
              <a
                href='https://https://gou-oui.com/faqs/'
                className='header-item'
              >
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
              <a
                href='https://gou-oui-cookies.vercel.app/'
                className='header-item'
              >
                Cookies
              </a>
              <a
                href='https://https://gou-oui.com/contact/'
                className='header-item'
              >
                Contact
              </a>
              <a
                href='https://gou-oui-cookies.vercel.app/'
                className='header-item'
              >
                Order
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='header-content-mobile'>
        <div className='header-mobile-logo'>
          <a href=''>
            <img
              src='https://res.cloudinary.com/dvwpbbisf/image/upload/v1674544366/jyl8lm0psjwd5gplxuce.png'
              width='200px'
            />
          </a>
        </div>
        <div>
          {!opened ? (
            <svg
              width='36'
              height='36'
              viewBox='0 0 36 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => setOpened(true)}
            >
              <rect x='2' y='8' width='33' height='4' rx='2' fill='#1F97C7' />
              <rect x='2' y='16' width='33' height='4' rx='2' fill='#1F97C7' />
              <rect x='2' y='24' width='33' height='4' rx='2' fill='#1F97C7' />
            </svg>
          ) : (
            <svg
              width='36'
              height='36'
              viewBox='0 0 36 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => setOpened(false)}
            >
              <rect
                x='5.41853'
                y='28.2531'
                width='33'
                height='4'
                rx='2'
                transform='rotate(-45 5.41853 28.2531)'
                fill='#1F97C7'
              />
              <rect
                x='8.24695'
                y='5'
                width='33'
                height='4'
                rx='2'
                transform='rotate(45 8.24695 5)'
                fill='#1F97C7'
              />
            </svg>
          )}
          {opened ? (
            <div className='mobile-menu'>
              <div
                className='mobile-menu-item'
                onClick={() =>
                  window.open('https://https://gou-oui.com/', '_self')
                }
              >
                <a>Home</a>
              </div>
              <div
                className='mobile-menu-item'
                onClick={() =>
                  window.open('https://https://gou-oui.com/about/', '_self')
                }
              >
                <a>About</a>
              </div>
              <div
                className='mobile-menu-item'
                onClick={() =>
                  window.open('https://https://gou-oui.com/faqs/', '_self')
                }
              >
                <a>Cookies</a>
              </div>
              <div
                className='mobile-menu-item'
                onClick={() =>
                  window.open('https://gou-oui-cookies.vercel.app/', '_self')
                }
              >
                <a>FAQS</a>
              </div>
              <div
                className='mobile-menu-item'
                onClick={() =>
                  window.open('https://https://gou-oui.com/contact/', '_self')
                }
              >
                <a>CONTACT</a>
              </div>
              <div
                className='mobile-menu-item'
                onClick={() =>
                  window.open('https://gou-oui-cookies.vercel.app/', '_self')
                }
              >
                <a>ORDER</a>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
