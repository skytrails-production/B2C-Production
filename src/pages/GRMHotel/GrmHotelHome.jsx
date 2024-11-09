import Download from "../home/Download";
import React from "react";
import { motion } from "framer-motion";
import Advertise from "../home/Advertise";
import hotelBanner from "../../images/hotelBanner.webp";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import Partners from "../home/Partners";
import GrmHotelForm from "./GrmHotelForm";
import Img from "../../LazyLoading/Img";
import diwali from "../../images/diwali.png";
import StaySearchForm from "../../components/TailwindSearchComp/heroSection/staySearchForm/StaySearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
import HotelSuggestion from "../../components/TailwindSearchComp/hotelSuggestion/HotelSuggestion";
import GrnHomeStaticHotel from "./GrnHomeStaticHotel";

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

      <div className="heroBannerFlight flex md:hidden lg:hidden">
        <div className="backdrop-img">
          <Img src={hotelBanner} />
        </div>
        <div className="opacity-layer"></div>
        <div className="heroBannerContent container">
          <span className="headingTitle">
            Make booking easy and convenient.
          </span>
          <GrmHotelForm />
        </div>
      </div>

      <div
        className="flightMainBox relative py-28 pt-44 bg-[radial-gradient(circle,_rgba(189,22,15,1)_0%,_rgba(214,74,80,1)_100%)] hidden md:flex bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${hotelBanner})` }}
      >
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

      {/* <div className="mt-3">
        <NewHolidayCategory />
      </div> */}
      <div>
        {/* <NewHolidayTrending /> */}
        <TrendingPackageHome />
      </div>

      {/* <div>
        <Advertise />
      </div> */}

      {/* <div>
        <HolidayTopCountries />
      </div> */}

      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Faq />
      </div>
      {/* <div>
        <Download />
      </div>
      <div>
        <Partners />
      </div>

      <div>
        <Blog />
      </div> */}
      <div>
        <FooterNavigation />
      </div>
    </motion.div>
  );
};
export default GrmHotelHome;
