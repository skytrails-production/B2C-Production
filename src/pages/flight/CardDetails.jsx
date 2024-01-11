// PaymentForm.jsx
import React from 'react';
import './CardDetails.css';

const CardDetails = () => {
  return (
    <div className="payment-form-container">
      <div className="form-section">
        <div className="card-number-section">
          <div className="form-label">Card Number</div>
          <div className="input-container">
            <div className="input-placeholder">Enter Your Card Number Here</div>
          </div>
        </div>
        
      </div>
   
     
<div className="form-section1">
  <div className="card-number-section">
    <div className="form-label">Name on Card</div>
    <div className="input-container">
      <div className="input-placeholder">Enter Your Name On Card</div>
    </div>
   
  </div>
  <div className="card-number-section">
  <div className="form-label">Card CVV</div>
    <div className="input-container">
      <div className="input-placeholder">Enter Card CVV</div>
    </div>
    </div>
</div>

      <div className="form-section">
        <div className="form-label">MOBILE NUMBER</div>
        <div className="mobile-number-section">
          <div className="input-container">
            <div className="input-placeholder">Month</div>
            <div className="rotate-icon">
              <div className="icon"></div>
            </div>
          </div>
          <div className="input-container">
            <div className="input-placeholder">Year</div>
            <div className="rotate-icon">
              <div className="icon"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="total-due-section">
        <div className="total-due-amount">
          <span className="total-amount">₹1,74,908   <span className="due-now">Due Now</span></span>
        
        </div>
        <div className="pay-now-button">
        <div className="pay-now-button-text">PAY NOW</div>
      </div>
      </div>
     
      <div className="terms-and-conditions">
        <span className="terms-label">By continuing to pay, I understand and agree with the </span>
        <span className="privacy-link">privacy policy</span>
        <span className="terms-label">, the </span>
        <span className="user-agreement-link">user agreement</span>
        <span className="terms-label"> and </span>
        <span className="terms-link">terms of service</span>
        <span className="terms-label"> of TheSkytrails.</span>
      </div>
    </div>
  );
};

export default CardDetails;
