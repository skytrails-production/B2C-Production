
// import OfferSwipeToSlide from "../../components/Offerscard";
// import Toursection from "../../components/Toursection";
import Download from "../../pages/home/Download";
// import Footer from "../../layouts/Footer";
import Bussearch from "./Bussearch";
// import OfferCard from "../flight/OfferCard";
// import Navbar from "../../layouts/Navbar";
// import Mainheader from "../../UI/Mainheader";
import BigNavbar from "../../UI/BigNavbar/BigNavbar";
// import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
// bus css  
import { motion } from "framer-motion";
import "./bus.css";
import Advertise from '../home/Advertise';
import FLightOffer from '../flight/FLightOffer';
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg"

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




const Taxi = () => {
    return (
        <div>

            <div className='mainimg'>
                <img className="bannerBack" src={onewayBG} alt="" />
                {/* <InsideNavbar /> */}
                <BigNavbar />
                <Bussearch />
            </div>

            <motion.div variants={variants} initial="initial"
                whileInView="animate"  >
                <FLightOffer variants={variants} />
            </motion.div>
            <motion.div variants={variants} initial="initial"
                whileInView="animate" style={{ position: "relative", top: "-30px" }} >
                <Advertise variants={variants} />
            </motion.div>
            <Download />
        </div>
    )
}
export default Taxi;
