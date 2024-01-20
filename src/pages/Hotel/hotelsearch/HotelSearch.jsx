import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Hotelresult from "../hotelresult/Hotelresult";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import "./hotelsearch.css"
import { Helmet } from "react-helmet-async";



const HotelSearch = () => {

  return (
    <>
      <Helmet>
        <title>Hotel Search</title>
        <link rel="canonical" href="/hotel/hotelsearch" />
        <meta name="description" content="hotel Search" />
        <meta name="keywords" content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices " />
      </Helmet>
      <div className='mainimgHotelSearch'>
        {/* <Navbar /> */}
        {/* <BigNavbar /> */}
        <InsideNavbar />
      </div>
      <div className="">
        <Hotelresult />
      </div>
    </>

  );
};

export default HotelSearch;
