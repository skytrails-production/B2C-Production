import React from "react";
import logoLoader from "../images/logoLoader.png";

const PaymentGatewayLoader = () => {
  return (
    <div className="bg-white">
      <div className="fixed inset-0 bg-gray-800 z-50 bg-opacity-60 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Circular Image with Loader */}
          <div className="relative w-40 h-40">
            <img
              src={logoLoader} // Replace with your PNG image path
              alt="Logo"
              className="w-full h-full object-cover rounded-full p-2 animate-pulse"
            />
            <div className="absolute inset-0 rounded-full border-5 border-white border-t-primary-600 animate-spin z-50"></div>
          </div>
          {/* Text */}
          <h2 className="mt-6 text-lg text-white">
            Redirecting to Payment Gateway
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayLoader;
