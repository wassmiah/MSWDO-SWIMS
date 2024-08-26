import './home.css';
import Header from '../../components/header';
import Footer from '../../components/footer';

function home ()  {
    return (
      <>
      <Header />
        <div className="whole">
          <div className="home">
            <div className="protect">
              <h1>Protecting Filipinos:</h1>
              <h4>Together for a Safer Tomorrow</h4>
            </div>
  
            <div class="pic">
              <img src="/Pic/filipino.jpg" alt="Hello"></img>
            </div>
          </div>
  
            <div className="about">
              <h1>About Us</h1>
            </div>
        
            <div  className="pa">
              <p>Welcome to the Social Welfare Information Management System (MSWDO-SWIMS) for the Municipality Social Welfare and Development Office (MSWDO) in Guiguinto, Bulacan. Our mission is to enhance the management of social welfare services through a comprehensive, efficient, and user-friendly information system. We are committed to supporting social workers in delivering timely and effective assistance to our community's most vulnerable populations.</p>
            </div>
        
            <div className="mission">
              <h1>Mission</h1>
            </div>
  
          <div class="mis">
            <div class="mispic">
              <img src="/Pic/kid.jpg" alt="Hello"></img>
            </div>
  
            <div class="mispa">
              <p>Our mission is to empower the MSWDO of Guiguinto, Bulacan with a robust information management system that ensures accurate, up-to-date, and accessible case information. By leveraging technology, we aim to improve service delivery, facilitate informed decision-making, and enhance the overall efficiency of social welfare programs.</p>
            </div>
          </div>
        
            <div className="vision">
              <h1>Vision</h1>
            </div>
  
          <div class="vis">
            <div class="vispa">
              <p>Our vision is to create a model of excellence in social welfare management through innovative technology solutions. We strive to set a standard for service delivery that is responsive, data-driven, and focused on the well-being of every individual in our community.</p>
            </div>
  
            <div class="vispic">
              <img src="/Pic/kids2.jpg" alt="Hello"></img>
            </div>
          </div>
        </div>
      <Footer />
      </>
    );
  }
    
    export default home;
    