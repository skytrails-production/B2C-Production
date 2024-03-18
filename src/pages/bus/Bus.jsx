// import OfferSwipeToSlide from "../../components/Offerscard";
// import Toursection from "../../components/Toursection";
import Download from "../../pages/home/Download";
// import Footer from "../../layouts/Footer";
import Bussearch from "./Bussearch";
// import OfferCard from "../flight/OfferCard";
// import Navbar from "../../layouts/Navbar";
// import Mainheader from "../../UI/Mainheader";
// import BigNavbar from "../../UI/BigNavbar/BigNavbar";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
// bus css
import { motion } from "framer-motion";
import "./bus.css";
import Advertise from "../home/Advertise";
import FLightOffer from "../flight/FLightOffer";
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import HolidayBudget from "../holidaypackages/holidayCategory/HolidayBudget";
import Partners from "../home/Partners";
import EventBanner from "../home/EventBanner";

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

const Taxi = () => {
  return (
    <div>
      <Helmet>
        <title>The Skytrails - Bus Booking, Hotel Booking, Flight Booking </title>
        <link rel="canonical" href="/bus" />
        <meta name="description" content="Book bus ticket online at lowest price from The Skytrails. Get affordable deals and discounts on booking your bus ticket. No need to stand in lines anymore." />
        <meta
          name="keywords"
          content="online bus booking,cheap bus ticket,compare bus fare,best bus deal,last minute bus booking,luxury bus travel,comfortable bus journeys,overnight bus trips,scenic bus routes,student bus passes,sleeper bus with AC,bus with Wi-Fi and charging points,pet-friendly bus travel,luggage allowance on buses"
        />
      </Helmet>

      <div className="mainimg">
        <img className="bannerBack" src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/onewayBG.jpg" alt="banner" />
        <InsideNavbar />
        {/* <BigNavbar /> */}
        <Bussearch />
      </div>

      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <HolidayBudget variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
        style={{ position: "relative" }}
      >
        <EventBanner variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" viewport={{ once: true, amount: 0.8 }} whileInView="animate">
        <FLightOffer variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
        style={{ position: "relative", top: "-30px" }}
      >
        <Advertise variants={variants} />
      </motion.div>
      <Download />
      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <Partners variants={variants} />
      </motion.div>
      <WhyChooseUs />
    </div>
  );
};
export default Taxi;
