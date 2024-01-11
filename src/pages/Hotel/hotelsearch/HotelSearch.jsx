import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Hotelresult from "../hotelresult/Hotelresult";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import "./hotelsearch.css"



const HotelSearch = () => {

  return (
    <>
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
