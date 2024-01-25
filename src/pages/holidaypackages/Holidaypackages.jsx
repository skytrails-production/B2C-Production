import React from "react";
import Hotelpackageform from "../../components/Hotelpackageform";
import Download from "../home/Download";
// import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
import Advertise from "../home/Advertise";
// import FLightOffer from '../flight/FLightOffer';
import BigNavbar from "../../UI/BigNavbar/BigNavbar";
import HolidaySuggestion from "./holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "./holidayCategory/HolidayCategory";
import HolidayDomestic from "./holidayCategory/HolidayDomestic";
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

const Hotelpackages = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Holiday Packages</title>
        <link rel="canonical" href="/holidaypackages" />
        <meta name="description" content="one packages" />
        <meta
          name="keywords"
          content=",family vacation packages,luxury travel deals,budget-friendly getaways,weekend escapes,city break packages     ,scuba diving holidays,cultural tours,skiing and snowboarding packages,wellness retreats,romantic getaways  ,7-day package deal to goa with flights,all-inclusive family fun at [resort name],off-the-beaten-path adventure tours in india,romantic spa getaways under [price],cruise with balcony cabin and shore excursions
          "
        />
      </Helmet>
      <div className="mainimg">
        {/* <img className="bannerBack" src={onewayBG} alt="" /> */}  <img className="bannerBack" src="https://img.freepik.com/premium-photo/orange-green-watercolor-background_468073-45.jpg?w=1480" alt="background" />

        {/* <InsideNavbar /> */}
        <BigNavbar />
        <Hotelpackageform />
      </div>

      <motion.div variants={variants} initial="initial" whileInView="animate">
        <HolidayCategory variants={variants} />
      </motion.div>
      {/* <motion.div variants={variants} initial="initial"
                whileInView="animate"  >
                <FLightOffer variants={variants} />
            </motion.div> */}
      <motion.div variants={variants} initial="initial" whileInView="animate">
        {/* <FLightOffer variants={variants} /> */}
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

      <Download />
      <WhyChooseUs />
    </React.Fragment>
  );
};

export default Hotelpackages;
