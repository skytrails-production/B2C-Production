import Download from "../home/Download";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Advertise from "../home/Advertise";
import flightbanner from "../../images/aerial.png";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import HolidayBudget from "../holidaypackages/holidayCategory/HolidayBudget";
import HolidayDomestic from "../holidaypackages/holidayCategory/HolidayDomestic";
import Partners from "../home/Partners";
import GrmHotelForm from "./GrmHotelForm";
import HolidayCategory from "../holidaypackages/holidayCategory/HolidayCategory";
// import Topflightroute from "../flight/Topflightroute";
import HolidaySuggestion from "../holidaypackages/holidaySuggestion/HolidaySuggestion";
import SwipeToSlide from "../../components/Card";
import Blog from "../home/Blog";
import GrnHomeStaticHotel from "./GrnHomeStaticHotel";

const variants = {
    initial: {
        y: 50,
        opacity: 1,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

const GrmHotelHome = () => {


    const downloadRef = useRef(null);


    return (
        <motion.div className="hotel_banner">
            <Helmet>
                <title>The Skytrails - Hotel Booking, Flight Booking, Bus Booking</title>
                <link rel="canonical" href="/hotel" />
                <meta name="description" content="hotel" />
                <meta name="keywords" content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices " />
            </Helmet>

            <div className="mainimg">
                <img className="bannerBack" src={flightbanner} alt="background" />
                {/* <BigNavbar /> */}
                <GrmHotelForm />
            </div>


            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
                style={{ position: "relative" }}
            >
                <GrnHomeStaticHotel variants={variants} />
            </motion.div>

            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <HolidayCategory variants={variants} />
            </motion.div>

            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <HolidayBudget variants={variants} />
            </motion.div>


            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
                style={{ position: "relative" }}
            >
                <HolidaySuggestion variants={variants} />
            </motion.div>
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
                style={{ position: "relative" }}
            >
                <Advertise variants={variants} />
            </motion.div>

            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <HolidayDomestic variants={variants} />
            </motion.div>

            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <SwipeToSlide variants={variants} />
            </motion.div>
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <Blog variants={variants} />
            </motion.div>
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <Download downloadRef={downloadRef} variants={variants} />
            </motion.div>
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <WhyChooseUs variants={variants} />
            </motion.div>
            {/* <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <FLightOffer variants={variants} />
      </motion.div> */}
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.8 }}
            >
                <Partners variants={variants} />
            </motion.div>
        </motion.div>
    );
};
export default GrmHotelHome;
