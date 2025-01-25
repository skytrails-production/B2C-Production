import Download from "../home/Download";
import React, { useRef } from "react";
import "./hotelhome.css";
import HotelForm from "./HotelForm";
import { motion } from "framer-motion";
import Advertise from "../home/Advertise";
// import FLightOffer from "../flight/FLightOffer";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import Partners from "../home/Partners";

const Hotelhome = () => {
  return (
    <motion.div className="hotel_banner">
      <Helmet>
        <title>
          The Skytrails - Hotel Booking, Flight Booking, Bus Booking
        </title>
        <link rel="canonical" href="/hotel" />
        <meta name="description" content="hotel" />
        <meta
          name="keywords"
          content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices "
        />
      </Helmet>

      <div className="mainimg">
        <img className="bannerBack" alt="banner" />

        {/* <BigNavbar /> */}
        <HotelForm />
        {/* <GrmHotelHome /> */}
      </div>
      <div>{/* <FLightOffer /> */}</div>
      <div>
        <Advertise />
      </div>

      <div>
        <Download />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Partners />
      </div>
    </motion.div>
  );
};
export default Hotelhome;
