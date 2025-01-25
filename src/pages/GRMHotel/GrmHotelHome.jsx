import React from "react";
import { motion } from "framer-motion";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import hotelBeachImg from "../../images/hotelBeach.jpg";
import StaySearchForm from "../../components/TailwindSearchComp/heroSection/staySearchForm/StaySearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
import HotelSuggestion from "../../components/TailwindSearchComp/hotelSuggestion/HotelSuggestion";
import GrnHomeStaticHotel from "./GrnHomeStaticHotel";
import Download from "../home/Download";

const GrmHotelHome = () => {
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

      <div className="flightMainBox relative py-28 pt-44 flex md:flex justify-center bg-cover bg-top bg-no-repeat">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster={hotelBeachImg}
          loop
          autoPlay
          muted
        >
          {/* <source src={hotelBeach} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        <StaySearchForm />
      </div>

      <div>
        <OfferMain active={"HOTELS"} />
      </div>

      <div>
        <GrnHomeStaticHotel />
      </div>
      <div>
        <HotelSuggestion />
      </div>
      <div>
        <TrendingPackageHome />
      </div>

      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Download />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <FooterNavigation />
      </div>
    </motion.div>
  );
};
export default GrmHotelHome;
