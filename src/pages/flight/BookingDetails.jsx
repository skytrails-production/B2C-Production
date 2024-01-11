// booking.jsx

import React from 'react';
import './BookingDetails.css';

const BookingDetails = () => {
  return (
    <div className="container7">
      <div className="header">
        <div className="booking-title">Your Booking</div>
        <div className="flight-type">ONE WAY FLIGHT</div>
      </div>

      <div className="flight-info-container">
      <div className="airline-info">
        <div className="logo">
          <div className="logo-background"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_367_27895)">
    <path d="M11.54 14.49C10.262 14.49 9.276 13.492 9.276 12.214C9.276 10.962 10.256 9.944 11.54 9.944C12.772 9.944 13.778 10.962 13.778 12.214C13.778 13.492 12.773 14.491 11.539 14.491L11.54 14.49ZM14.614 6.636L14.4 7.634C13.81 6.454 12.052 6.337 11.105 6.337C8.153 6.337 5.578 9.178 5.578 13.083C5.578 16.223 7.453 18.194 9.808 18.194C11.124 18.194 12.24 17.89 13.161 16.794L12.921 17.896H16.632L18.324 6.636C17.086 6.635 15.842 6.646 14.614 6.636ZM12 0C18.63 0 24 5.37 24 12C24 18.63 18.63 24 12 24C5.37 24 0 18.63 0 12C0 5.37 5.37 0 12 0Z" fill="#FF0000"/>
  </g>
  <defs>
    <clipPath id="clip0_367_27895">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg></div>
        </div>
        <div className="info">
          <span className="airline-name">AirAsia</span>
          <span className="flight-number">6E403</span>
        </div>
      </div>
      <div className="aircraft-type">
        <div className="badge">
          <div className="badge-content">Airbus A320</div>
        </div>
      </div>
    </div>

      <div className="flight-timings">
        <div className="time-info">
          <span>10:55 PM</span>
          <span className="day">Thu, 18 Jan 2024</span>
        </div>
        <div className="time-divider"></div>
        <div className="time-info">
          <span>1:35 AM</span>
          <span className="day">Sat, 27 Jan 2024</span>
        </div>
      </div>

      <div className="traveler-info">
        <div className="traveler-details">
          <div className="traveler-icon">
            <div>
              <div></div>
              <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <mask id="mask0_367_27906"  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
    <rect width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_367_27906)">
    <path d="M10.0007 10.0004C9.08398 10.0004 8.29926 9.67402 7.64648 9.02124C6.99371 8.36846 6.66732 7.58374 6.66732 6.66707C6.66732 5.75041 6.99371 4.96568 7.64648 4.31291C8.29926 3.66013 9.08398 3.33374 10.0007 3.33374C10.9173 3.33374 11.702 3.66013 12.3548 4.31291C13.0076 4.96568 13.334 5.75041 13.334 6.66707C13.334 7.58374 13.0076 8.36846 12.3548 9.02124C11.702 9.67402 10.9173 10.0004 10.0007 10.0004ZM3.33398 16.6671V14.3337C3.33398 13.8615 3.45551 13.4275 3.69857 13.0317C3.94162 12.6358 4.26454 12.3337 4.66732 12.1254C5.52843 11.6949 6.40343 11.3719 7.29232 11.1567C8.18121 10.9414 9.08398 10.8337 10.0007 10.8337C10.9173 10.8337 11.8201 10.9414 12.709 11.1567C13.5979 11.3719 14.4729 11.6949 15.334 12.1254C15.7368 12.3337 16.0597 12.6358 16.3027 13.0317C16.5458 13.4275 16.6673 13.8615 16.6673 14.3337V16.6671H3.33398ZM5.00065 15.0004H15.0007V14.3337C15.0007 14.181 14.9625 14.0421 14.8861 13.9171C14.8097 13.7921 14.709 13.6949 14.584 13.6254C13.834 13.2504 13.077 12.9692 12.3132 12.7817C11.5493 12.5942 10.7784 12.5004 10.0007 12.5004C9.22287 12.5004 8.45204 12.5942 7.68815 12.7817C6.92426 12.9692 6.16732 13.2504 5.41732 13.6254C5.29232 13.6949 5.19162 13.7921 5.11523 13.9171C5.03885 14.0421 5.00065 14.181 5.00065 14.3337V15.0004ZM10.0007 8.33374C10.459 8.33374 10.8513 8.17055 11.1777 7.84416C11.5041 7.51777 11.6673 7.12541 11.6673 6.66707C11.6673 6.20874 11.5041 5.81638 11.1777 5.48999C10.8513 5.1636 10.459 5.00041 10.0007 5.00041C9.54232 5.00041 9.14996 5.1636 8.82357 5.48999C8.49718 5.81638 8.33398 6.20874 8.33398 6.66707C8.33398 7.12541 8.49718 7.51777 8.82357 7.84416C9.14996 8.17055 9.54232 8.33374 10.0007 8.33374Z" fill="#1C1B1F"/>
  </g>
</svg></div>
            </div>
          </div>
          <div>
            <span className="traveler-name">Traveler(s)</span>
            <span className="traveler-name">1. ANSHUL KUMAR (M, ADULT)</span>
            <span className="traveler-details">xyz@gmail.com | +91 - xxxxxxx</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
