import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OfferCard = ({ className = "", data }) => {
  const navigate = useNavigate();

  console.log(data, "data in the offer carddddd");

  return (
    <div className={`nc-CardCategory3 flex flex-col ${className}`}>
      <div
        className={`flex-shrink-0 p-2 bg-gray-200 relative w-full aspect-w-5 aspect-h-3 sm:aspect-h-6 rounded-2xl overflow-hidden group`}
      >
        <img
          src={data?.image}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
        />

        <h3 className="mt-2 text-lg font-semibold truncate ">{data?.title}</h3>
        <p className="line-clamp-2">{data?.content}</p>

        {/* <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span> */}
      </div>
    </div>
  );
};

export default OfferCard;
