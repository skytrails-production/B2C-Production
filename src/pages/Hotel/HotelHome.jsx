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
        {/* <title>
          The Skytrails - Hotel Booking, Flight Booking, Bus Booking
        </title>
        <link rel="canonical" href="/hotel" />
        <meta name="description" content="hotel" />
        <meta
          name="keywords"
          content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices "
        /> */}
        <title>
          Discover the Best Hotel Offers and Save More with The SkyTrails
        </title>
        <meta
          name="description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta name="robots" content="INDEX, FOLLOW" />

        <meta property="og:site_name" content="The SkyTrails" />
        <meta property="og:url" content="https://theskytrails.com/st-hotel" />
        <meta
          property="og:image"
          content="https://theskytrails.com/static/media/hotelBeach.688b493455328b1dfb64.jpg"
        />
        <meta
          property="og:description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Discover the Best Hotel Offers and Save More with The SkyTrails"
        />

        <meta name="package_type" content="Flight" />
        <meta
          name="keywords"
          content="Cheap hotel booking for honeymoon couples, family holiday hotels, international stays, luxury lodging options, discount accommodation packages."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Discover the Best Hotel Offers and Save More with The SkyTrails"
        />
        <meta
          name="twitter:description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta
          name="twitter:image"
          content="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
        />
        <meta name="twitter:image:alt" content="The SkyTrails logo" />
        <meta name="twitter:creator" content="@Theskytrails" />
        <meta name="twitter:site" content="@Theskytrails" />

        <link
          rel="shortcut icon"
          href="https://theskytrails.com/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="https://theskytrails.com/favicon.ico"
          type="image/x-icon"
        />
        <link rel="canonical" href="https://theskytrails.com/st-hotel" />
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
