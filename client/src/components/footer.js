import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSquareXTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

function Footer() {
  return (
    <>
      <div className="Hi">
        <div className="foot">
          <div className="left">
            <img src="/Pic/logo.png" alt="Hello" />
          
              <div className="soci">
                <div className="social-buttons">
                  <a href="/" className="facebook-icon">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  
                  <a href="/" className="twitter-icon">
                    <FontAwesomeIcon icon={faSquareXTwitter} />
                  </a>
              
                  <a href="/" className="google-icon">
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </div>
              </div>
          </div>
          
          <div className="right">
            <div className="foote">
              <a href="/">FAQs</a>
              <a href="/">Support Center</a>
              <a href="/">Safety Guideline</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
