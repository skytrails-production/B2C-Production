import scan from "../../images/scan.png";
import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./download.css";
import "../../components/card.css";
// import app from "../../images/app.png";
// import app1 from "../../images/app1.jpg"
// import app2 from "../../images/app2.jpg"
// import app3 from "../../images/app3.jpg"
// import app4 from "../../images/app4.jpg"
// import mobileframe from "../../images/mobileframe.jpg"
// import google from "../../images/google.png"
// import { motion, AnimatePresence } from "framer-motion";


import step1 from "../../images/download/steps-1.png"
import step2 from "../../images/download/steps-2.png"
import step3 from "../../images/download/steps-3.png"
// import downloadBG from "../../images/download/downloadBG.png"
import apple from "../../images/download/apple.png"
import google from "../../images/download/google.png"
import mobil from "../../images/download/mobil.png"
import check from "../../images/download/check.png"

// const variants = {
//   initial: {
//     x: 0,
//     opacity: 0.8,
//     transition: {
//     },
//   },
//   animate: {
//     x: 0,
//     opacity: 1,
//     transition: {

//     },
//   },
//   exit: {

//     x: -190,
//     opacity: 0.8,
//     transition: {

//     },
//   },
// };


// const quotes = [
//   {
//     img: app1,

//   },
//   {
//     img: app2,

//   },
//   {
//     img: app3,


//   },
//   {
//     img: app4
//   }
// ];

// const getRandomQuote = () => {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   return quotes[randomIndex];
// };



const Download = () => {


  // const [data, setData] = useState(null);
  // const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = getRandomQuote();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();

  //   const intervalId = setInterval(() => {
  //     fetchData();
  //     setCurrentImgIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  //   }, 4000);

  //   return () => clearInterval(intervalId);
  // }, []);


  return (

    <>
      <section class="download-gap download-no-top">
        <div class="container">
          <div class="download-heading">
            <h2>Take Full Control of Your Booking</h2>
          </div>
          <div class="row">
            <div className="col-lg-4 col-md-4">
              <div class="download-steps">
                <i><img src={step1} alt="steps" /></i>
                <span>1</span>
                <h4>Download from the Play Store on any device</h4>
                <p>download the app from the App Store or Google Play on any device</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div class="download-steps">
                <i><img src={step2} alt="steps" /></i>
                <span>2</span>
                <h4>Create an account with just Phone no & Email.</h4>
                <p>download the app from the App Store or Google Play on any device</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div class="download-steps">
                <i><img src={step3} alt="steps" /></i>
                <span>3</span>
                <h4>Explore the world with just your fingertips</h4>
                <p>download the app from the App Store or Google Play on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="download-section-mobil" style={{ backgroundImage: `url(${downloadBG})` }}> */}
      <section class="download-section-mobil mb-5" >
        <div class="opacityPackdownload"></div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="download-app">
                <h2>Download app from Play Store & App Store</h2>
                <ul class="download-list">
                  <li><img src={check} alt="check" />Flight Ticket, Bus Ticket, Hotel Booking</li>
                  <li><img src={check} alt="check" />Events, Recharge, Visa</li>
                </ul>
                <div className="qr-Box">
                  <div>
                    <img src={scan} className="scan-logo" alt="scan logo" />
                  </div>
                  <div class="d-sm-flex">
                    <a href="https://play.google.com/store/apps/details?id=com.skytrails" target="_blank"><img src={google} alt="google" /></a>
                    <a href="#"><img src={apple} alt="apple" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="download-img-mobil">
                <img src={mobil} alt="mobil" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Download;












































// import scan from "../../images/scan.png";
// import React, { useState, useEffect } from "react";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./download.css";
// import "../../components/card.css";
// import app from "../../images/app.png";
// import app1 from "../../images/app1.jpg"
// import app2 from "../../images/app2.jpg"
// import app3 from "../../images/app3.jpg"
// import app4 from "../../images/app4.jpg"
// import mobileframe from "../../images/mobileframe.jpg"
// import google from "../../images/google.png"
// import { motion, AnimatePresence } from "framer-motion";

// const variants = {
//   initial: {
//     x: 0,
//     opacity: 0.8,
//     transition: {
//     },
//   },
//   animate: {
//     x: 0,
//     opacity: 1,
//     transition: {

//     },
//   },
//   exit: {

//     x: -190,
//     opacity: 0.8,
//     transition: {

//     },
//   },
// };


// const quotes = [
//   {
//     img: app1,

//   },
//   {
//     img: app2,

//   },
//   {
//     img: app3,


//   },
//   {
//     img: app4
//   }
// ];

// const getRandomQuote = () => {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   return quotes[randomIndex];
// };



// const Download = () => {


//   const [data, setData] = useState(null);
//   const [currentImgIndex, setCurrentImgIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = getRandomQuote();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();

//     const intervalId = setInterval(() => {
//       fetchData();
//       setCurrentImgIndex((prevIndex) => (prevIndex + 1) % quotes.length);
//     }, 4000);

//     return () => clearInterval(intervalId);
//   }, []);


//   return (

//     <section className="">
//       <div className="container-fluid p-0">
//         <div className="qrBox">
//           <div className="qrTextDownload">
//             <div className="downloadHeading">
//               <h3>Download <br /> Our New App</h3>
//             </div>
//             <div className="allImgDownload">
//               <div className="ourQr">
//                 <motion.div className="scanPoly"
//                   whileInView={{ scale: [1, 0.9, 1], transition: { duration: 1, repeat: Infinity } }}
//                 >
//                   <p>Scan Me</p>
//                 </motion.div>
//                 <img src={scan} className="scan-logo" alt="scan logo" />
//               </div>
//               <div className="PlayQr">
//                 <a href="https://play.google.com/store/apps/details?id=com.skytrails" target="_blank">
//                   <img src={google} alt="playstore" />
//                 </a>
//                 <img src={app} alt="applestore" />
//               </div>
//             </div>
//           </div>
//           <div className="outerBacksvg">
//             <AnimatePresence mode="wait">
//               <motion.div key={currentImgIndex} className="outMobileApp">
//                 <  img className="firFrame" src={mobileframe} alt="mobileframe" />
//                 <motion.img
//                   key={currentImgIndex}
//                   variants={variants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   src={quotes[currentImgIndex].img}
//                   alt="image"
//                   className="appDemo"
//                 />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Download;



