import React, { useEffect } from "react";
// import SwipeToSlide from "../../components/Card";
import Download from "../pages/home/Download";

// import "./home.css";
import { motion } from "framer-motion";
import Advertise from "../pages/home/Advertise"
import FLightOffer from "../pages/flight/FLightOffer";
import InsideNavbar from "../UI/BigNavbar/InsideNavbar";
import onewayBG from "../images/onewayBG.jpg";
// import BigNavbar from "../../UI/BigNavbar/BigNavbar";
import HolidaySuggestion from "../pages/holidaypackages/holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "../pages/holidaypackages/holidayCategory/HolidayCategory";
import HolidayDomestic from "../pages/holidaypackages/holidayCategory/HolidayDomestic"
import WhyChooseUs from "./WhyChooseUs";
import DummyTicketBookingForm from "./DummyTicketBookingForm"
import { Helmet } from "react-helmet-async";

const variants = {
    initial: {
        y: 50,
        opacity: 0,
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

const Home = () => {
    // console.log("helllo")
    useEffect(() => {
        sessionStorage.setItem("hdhhfb7383__3u8748", false);
    }, [])
    return (
        <div className="home_banner">
            <Helmet>
                <title>The Skytrails</title>
                <link rel="canonical" href="/" />
                <meta name="description" content="one way flight" />
                <meta
                    name="keywords"
                    content="
online flight booking,compare flight prices,best airfare deals,last minute flights,multi-city flight booking,business class flights,non-stop flights budget airlines,family-friendly airlines,flight upgrades,round trip flights under 4000,direct flights with vistara,airports with cheapest flights to Vistara,flights with in-flight entertainment,flexible booking options"
                />
            </Helmet>

            <div className="mainimg">
                {/* <img className="bannerBack" src="https://img.freepik.com/premium-vector/landscape-with-buildings-vehicles-morning-city-life_95169-195.jpg?w=1060" alt="background" /> */}
                <img className="bannerBack" src={onewayBG} alt="background" />
                <InsideNavbar />
                {/* <BigNavbar /> */}
                <DummyTicketBookingForm />
            </div>

            <motion.div variants={variants} initial="initial" whileInView="animate">
                <HolidayCategory variants={variants} />
            </motion.div>

            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                style={{ position: "relative" }}
            >
                <HolidaySuggestion variants={variants} />
            </motion.div>
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                style={{ position: "relative" }}
            >
                <Advertise variants={variants} />
            </motion.div>


            <motion.div variants={variants} initial="initial" whileInView="animate">
                <HolidayDomestic variants={variants} />
            </motion.div>


            <motion.div variants={variants} initial="initial" whileInView="animate">
                <Download variants={variants} />
            </motion.div>
            <motion.div variants={variants} initial="initial" whileInView="animate">
                <WhyChooseUs variants={variants} />
            </motion.div>
            <motion.div variants={variants} initial="initial" whileInView="animate">
                <FLightOffer variants={variants} />
            </motion.div>
        </div>
    );
};
export default Home;