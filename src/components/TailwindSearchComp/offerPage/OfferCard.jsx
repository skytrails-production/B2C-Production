import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OfferCard = ({ className = "", data }) => {
  const navigate = useNavigate();
  const handlecountryClick = async (category) => {
    const queryParameter = category;
    navigate(`/holidaypackages/country/${queryParameter}`);
  };

  return (
    <div
      onClick={() => handlecountryClick(data?.country)}
      className={`nc-CardCategory3 flex flex-col ${className}`}
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-3 sm:aspect-h-6 h-44 rounded-2xl overflow-hidden group`}
      >
        <img
          src={data?.image}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
    </div>
  );
};

export default OfferCard;
