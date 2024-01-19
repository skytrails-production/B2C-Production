import Download from "../home/Download";
import "./hotelhome.css";
import HotelForm from "./HotelForm";
import { motion } from "framer-motion";
import Advertise from "../home/Advertise";
import FLightOffer from "../flight/FLightOffer";
// import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
import BigNavbar from "../../UI/BigNavbar/BigNavbar";
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
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

const Hotelhome = () => {
  return (
    <motion.div className="hotel_banner">
      <Helmet>
        <title>Hotel</title>
        <link rel="canonical" href="/hotel" />
        <meta name="description" content="hotel" />
        <meta name="keywords" content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices " />
      </Helmet>

      <div className="mainimg">
        <img className="bannerBack" src={onewayBG} alt="" />
        <BigNavbar />
        {/* <InsideNavbar /> */}
        <HotelForm />
      </div>
      <motion.div variants={variants} initial="initial" whileInView="animate">
        <FLightOffer variants={variants} />
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
        <Download variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" whileInView="animate">
        <WhyChooseUs variants={variants} />
      </motion.div>
    </motion.div>
  );
};
export default Hotelhome;
