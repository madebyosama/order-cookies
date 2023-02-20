import './Footer.css';
export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-content-column-one'>
          <div className='footer-content-column-one-row-one'>
            <div className='footer-content-title'>
              BUILT TO SWEETEN YOU MOOD.
            </div>
            <div className='footer-content-description'>
              At Gou Oui, we believe that cookies have the power to unite people
              and spread joy. Our goal is to infuse fun into every cookie, so
              you can create lasting memories and bring smiles to every
              gathering, one delicious bite at a time
            </div>
          </div>
          <div className='footer-content-column-one-row-two'>
            <div className='footer-content-title'>FIND US ON</div>
            <div className='footer-content-social'>
              <a href='#' target='_blank' className='footer-social-image-one'>
                <img src='https://res.cloudinary.com/dvwpbbisf/image/upload/v1675169147/instagram_cdprrk.svg' />
              </a>
              <a href='#' target='_blank' className='footer-social-image-two'>
                <img src='https://res.cloudinary.com/dvwpbbisf/image/upload/v1675169148/tiktok_hugxl0.svg' />
              </a>
              <a href='#' target='_blank' className='footer-social-image-three'>
                <img src='https://res.cloudinary.com/dvwpbbisf/image/upload/v1675169148/facebook_d8ccfd.svg' />
              </a>
            </div>
          </div>
        </div>
        <div className='footer-content-column-two'>
          <div className='footer-content-title'>SITEMAP</div>
          <div className='footer-content-links'>
            <div className='footer-content-link'>
              <a href='#'>FAQs</a>
            </div>
            <div className='footer-content-link'>
              <a href='#'>Cookies</a>
            </div>
            <div className='footer-content-link'>
              <a href='#'>About us</a>
            </div>
            <div className='footer-content-link'>
              <a href='#'>Contact us</a>
            </div>
          </div>
          <div className='footer-content-column-two-row-two'>
            <div className='footer-content-title'>OTHER LINKS</div>
            <div className='footer-content-links'>
              <div className='footer-content-link'>
                <a href='#'>Privacy Policy</a>
              </div>
              <div className='footer-content-link'>
                <a href='#'>Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-content-column-three'>
          <div className='footer-content-title'>CONTACT</div>
          <div className='footer-content-description'>
            <p className='footer-small-title'>Address</p>
            <p className='footer-small-details'>
              1737 S Orange Ave. Ste. 300
              <br />
              Orlando, FL 32806
            </p>
            <p className='footer-small-title'>Phone</p>
            <p className='footer-small-details'>407.558.3055</p>
            <p className='footer-small-title'>Email</p>
            <p className='footer-small-details'>hello@gou-oui.com</p>
            <p className='footer-small-title'>Hours</p>
            <p className='footer-small-details'>
              Mon - Thurs:
              <br /> 11AM - 8PM
              <br />
              <br /> Fri - Sat:
              <br /> 11AM - 10PM
              <br />
              <br /> Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
