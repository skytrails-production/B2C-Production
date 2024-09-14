import Download from "../home/Download";
import React from "react";
import { motion } from "framer-motion";
import Advertise from "../home/Advertise";
import hotelBanner from "../../images/hotelBanner.webp"
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



const GrmHotelHome = () => {



    return (
        <motion.div className="hotel_banner" >
            <Helmet>
                <title>The Skytrails - Hotel Booking, Flight Booking, Bus Booking</title>
                <link rel="canonical" href="/hotel" />
                <meta name="description" content="hotel" />
                <meta name="keywords" content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices " />
            </Helmet>

            <div className='heroBannerFlight'>
                <div className="backdrop-img">
                    <Img src={hotelBanner} />
                </div>
                <div className="opacity-layer"></div>
                <div className="heroBannerContent container">
                    <span className="headingTitle">Make booking easy and convenient.</span>
                    <GrmHotelForm />
                </div>
            </div>


            {/* <div>
                <GrnHomeStaticHotel />
            </div> */}

            <div className="mt-3">
                <NewHolidayCategory />
            </div>
            <div>
                <NewHolidayTrending />
            </div>

            <div>
                <Advertise />
            </div>

            <div>
                <HolidayTopCountries />
            </div>

            <div>
                <WhyChooseUs />
            </div>
            <div>
                <Download />
            </div>
            <div>
                <Partners />
            </div>

            <div>
                <Blog />
            </div>
        </motion.div>
    );
};
export default GrmHotelHome;
