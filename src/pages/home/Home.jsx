import React from "react";
import SwipeToSlide from "../../components/Card";
import Download from "./Download";
import Oneway from "../../components/Oneway";
// import OfferCard from "../flight/OfferCard";
import "./home.css";
import { motion } from "framer-motion";
import Advertise from "./Advertise";
import FLightOffer from "../flight/FLightOffer";
// import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
import BigNavbar from "../../UI/BigNavbar/BigNavbar";
import HolidaySuggestion from "../holidaypackages/holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "../holidaypackages/holidayCategory/HolidayCategory";
import Topflightroute from "../flight/Topflightroute";
import HolidayDomestic from "../holidaypackages/holidayCategory/HolidayDomestic";
import WhyChooseUs from "../../components/WhyChooseUs";
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
  return (
    <div className="home_banner">
      <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
        <meta name="description" content="the skytrails" />
      </Helmet>

      <div className="mainimg">
        <img className="bannerBack" src={onewayBG} alt="background" />
        {/* <InsideNavbar /> */}
        <BigNavbar />
        <Oneway header="" />
      </div>

      <motion.div variants={variants} initial="initial" whileInView="animate">
        <HolidayCategory variants={variants} />
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        style={{ position: "relative", top: "-30px" }}
      >
        <Topflightroute variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        style={{ position: "relative", top: "-30px" }}
      >
        <HolidaySuggestion variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        style={{ position: "relative", top: "-30px" }}
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
        <SwipeToSlide variants={variants} />
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
