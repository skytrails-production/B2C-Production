import React from 'react'
import Hotelpackageform from "../../components/Hotelpackageform";
import Download from '../home/Download';
// import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg"
import Advertise from '../home/Advertise';
// import FLightOffer from '../flight/FLightOffer';
import BigNavbar from '../../UI/BigNavbar/BigNavbar';
import HolidaySuggestion from './holidaySuggestion/HolidaySuggestion';
import HolidayCategory from './holidayCategory/HolidayCategory';

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

            <div className='mainimg'>
                <img className="bannerBack" src={onewayBG} alt="" />
                {/* <InsideNavbar /> */}
                <BigNavbar />
                <Hotelpackageform />
            </div>


            {/* <motion.div variants={variants} initial="initial"
                whileInView="animate"  >
                <FLightOffer variants={variants} />
            </motion.div> */}
            <motion.div variants={variants} initial="initial"
                whileInView="animate"  >
                {/* <FLightOffer variants={variants} /> */}
                <HolidaySuggestion variants={variants} />
            </motion.div>
            <motion.div variants={variants} initial="initial"
                whileInView="animate"  >

                {/* <HolidayCategory variants={variants} /> */}
            </motion.div>
            <motion.div variants={variants} initial="initial"
                whileInView="animate" style={{ position: "relative", top: "-30px" }}>
                <Advertise variants={variants} />
            </motion.div>

            <Download />
        </React.Fragment>
    )
}

export default Hotelpackages;
