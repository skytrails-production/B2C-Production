// fareSummary.jsx

import React from 'react';
import './FareSummary.css';

const FareSummary = () => {
  return (
    <div className="fare-container">
      <div className="title">
        <div className="fare-title">Fare Summary</div>
      </div>
      <div className="fare-details">
        <div className="fare-item">
          <div className="fare-category">Fare</div>
          <div className="fare-amount">₹47,380</div>
        </div>
        <div className="fare-item">
          <div className="fare-category">Others</div>
          <div className="fare-amount">₹2,528</div>
        </div>
      </div>
      <div className="total-due">
        <div>
          <span className="due-title">Total Due</span>
          <span className="fee-info">Convenience fee added</span>
        </div>
        <div className="due-amount">₹49,908</div>
      </div>
    </div>
  );
};

export default FareSummary;
