import React, { useEffect } from "react";
import Download from "../../home/Download";
import { motion } from "framer-motion";
import Advertise from "./../../home/Advertise";
import FLightOffer from "../../flight/FLightOffer";
// import onewayBG from "../../../images/onewayBG.jpg"
import HolidaySuggestion from "../../holidaypackages/holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "../../holidaypackages/holidayCategory/HolidayCategory";
import Topflightroute from "../../flight/Topflightroute";
import HolidayDomestic from "../../holidaypackages/holidayCategory/HolidayDomestic";
import WhyChooseUs from "../../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import ReturnForm from "./ReturnForm";

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

const ReturnMain = () => {
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
                <img className="bannerBack" src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/onewayBG.jpg" alt="background" />
                {/* <BigNavbar /> */}
                <ReturnForm />
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
                <Topflightroute variants={variants} />
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

            {/* <motion.div variants={variants} initial="initial"
                whileInView="animate" style={{ position: "relative", top: "-100px" }} >
                <OfferCard variants={variants} />
            </motion.div> */}
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
export default ReturnMain;


