import React, { useState, useEffect } from "react";

import Sailsummary from "../guestdetail/Sailsummary";
import Reviewdescription from "./Reviewdescription";
import "./review.css";
import { useSelector } from "react-redux";
import HotelLoading from "../hotelLoading/HotelLoading";
import { motion } from "framer-motion";



const Reviewbooking = () => {
  const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });


  // console.log(reducerState?.hotelSearchResult, "hotelreducer shaan")
  // const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));review
  // const data = storedFormData.dynamicFormData[0];
  // console.log(storedFormData)
  return (
    <React.Fragment>
      {loader ? (
        <HotelLoading />
      ) : (

        <>
          <div className='mainimgHotelSearch'>

          </div>



          <div className="my-4 ">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2 order-2">
                  <Reviewdescription />
                </div>
                <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1 order-1">
                  <Sailsummary />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Reviewbooking;
