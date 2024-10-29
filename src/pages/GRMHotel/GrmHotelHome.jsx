import Download from "../home/Download";
import React from "react";
import { motion } from "framer-motion";
import Advertise from "../home/Advertise";
import hotelBanner from "../../images/hotelBanner.webp";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import Partners from "../home/Partners";
import GrmHotelForm from "./GrmHotelForm";
import Blog from "../home/Blog";
import GrnHomeStaticHotel from "./GrnHomeStaticHotel";
import NewHolidayCategory from "../NewPackagePages/holidayCategory/NewHolidayCategory";
import NewHolidayTrending from "../NewPackagePages/holidayTrending/NewHolidayTrending";
import HolidayTopCountries from "../NewPackagePages/holidayCountries/HolidayTopCountries";
import Img from "../../LazyLoading/Img";
import diwali from "../../images/diwali.png";
import StaySearchForm from "../../components/TailwindSearchComp/heroSection/staySearchForm/StaySearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";

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

      <div className="flightMainBox relative py-28 pt-44 bg-[radial-gradient(circle,_rgba(63,196,251,1)_0%,_rgba(70,153,252,1)_100%)] hidden md:flex">
        <img
          src={diwali}
          className="absolute top-0 left-0  h-full object-fill w-full"
          alt="Diwali Background"
        />
        <StaySearchForm />
      </div>

      {/* <div>
                <GrnHomeStaticHotel />
            </div> */}
      <div>
        <OfferMain />
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
