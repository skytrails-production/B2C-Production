import React, { useState } from "react";
import { useSelector } from "react-redux";
import HotelGuestDetailsGRN from "./HotelGuestDetailsGRN";
import PriceSummaryGRN from "./PriceSummaryGRN";




const BookingDetailsGRN = () => {


    return (

        <>
            <div className='mainimgHotelSearch'>
            </div>

            <div className="my-4 ">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2 order-2">
                            <HotelGuestDetailsGRN />
                        </div>
                        <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1 order-1">
                            <PriceSummaryGRN />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BookingDetailsGRN;
