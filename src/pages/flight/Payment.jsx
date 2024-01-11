// YourComponent.jsx

import React from 'react';
import './payment.css'; // Import the external CSS file
import PaymentOptions from './PaymentOptions';
import CardDetails from './CardDetails';
import BookingDetails from './BookingDetails';
import FareSummary from './FareSummary';
const Payment = () => {
  return (
    <div className="container5">
      <div className="payment-options">
        
        {/* Continue with other components... */}
       
        <div> <PaymentOptions/></div>
        <div><CardDetails/></div>
      </div>
      <div className="payment-options1">
        <BookingDetails/>
       <FareSummary/> 
        {/* Continue with other components... */}
      </div>
      {/* Continue with other components... */}
    </div>
  );
};

export default Payment;
