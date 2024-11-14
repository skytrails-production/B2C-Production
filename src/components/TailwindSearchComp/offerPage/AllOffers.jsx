import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../shared/Heading";

const AllOffers = ({ className = "" }) => {
  const navigate = useNavigate();
  const localData = sessionStorage.getItem("advertise");
  const localDataArray = JSON.parse(localData);

  const handleClick = (item) => {
    navigate(`/offerDetail?couponType=${item?.addType}&couponId=${item?._id}`);
  };

  return (
    <>
      <div className="custom-container my-5">
        <Heading desc={false} isCenter={true}>
          All Offers
        </Heading>
        <div className="row g-3">
          {localDataArray?.map((data, index) => (
            <div className="col-lg-3" key={index}>
              <div
                className={`nc-CardCategory3 pb-2 flex cursor-pointer flex-col ${className}`}
                onClick={() => handleClick(data)}
              >
                <div
                  className={`h-full p-2 bg-gray-200  shadow-md relative w-full aspect-w-5 aspect-h-3 sm:aspect-h-6 rounded-2xl overflow-hidden group`}
                >
                  <img
                    src={data?.image}
                    className="object-cover w-full h-full rounded-2xl"
                    alt="places"
                  />

                  <h3 className="mt-2 text-[1rem] font-semibold truncate">
                    {data?.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600">
                    Expiry Date:{dayjs(data?.endDate).format("DD MMM, YY")}
                  </p>

                  {/* <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllOffers;
