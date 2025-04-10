import React from "react";
import { motion } from "framer-motion";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import hotelBeachImg from "../../images/hotelBeach.jpg";
import StaySearchForm from "../../components/TailwindSearchComp/heroSection/staySearchForm/StaySearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
import HotelSuggestion from "../../components/TailwindSearchComp/hotelSuggestion/HotelSuggestion";
import GrnHomeStaticHotel from "./GrnHomeStaticHotel";
import Download from "../home/Download";

const GrmHotelHome = () => {
  return (
    <motion.div className="hotel_banner">
      <Helmet>
        {/* <title>
              The Skytrails - Hotel Booking, Flight Booking, Bus Booking
            </title>
            <link rel="canonical" href="/hotel" />
            <meta name="description" content="hotel" />
            <meta
              name="keywords"
              content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices "
            /> */}
        <title>
          Discover the Best Hotel Offers and Save More with The SkyTrails
        </title>
        <meta
          name="description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta name="robots" content="INDEX, FOLLOW" />

        <meta property="og:site_name" content="The SkyTrails" />
        <meta property="og:url" content="https://theskytrails.com/st-hotel" />
        <meta
          property="og:image"
          content="https://theskytrails.com/static/media/hotelBeach.688b493455328b1dfb64.jpg"
        />
        <meta
          property="og:description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Discover the Best Hotel Offers and Save More with The SkyTrails"
        />

        <meta name="package_type" content="Flight" />
        <meta
          name="keywords"
          content="Cheap hotel booking for honeymoon couples, family holiday hotels, international stays, luxury lodging options, discount accommodation packages."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Discover the Best Hotel Offers and Save More with The SkyTrails"
        />
        <meta
          name="twitter:description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta
          name="twitter:image"
          content="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
        />
        <meta name="twitter:image:alt" content="The SkyTrails logo" />
        <meta name="twitter:creator" content="@Theskytrails" />
        <meta name="twitter:site" content="@Theskytrails" />

        <link
          rel="shortcut icon"
          href="https://theskytrails.com/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="https://theskytrails.com/favicon.ico"
          type="image/x-icon"
        />
        <link rel="canonical" href="https://theskytrails.com/st-hotel" />
      </Helmet>

      <div className="flightMainBox relative py-28 pt-44 flex md:flex justify-center bg-cover bg-top bg-no-repeat">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster={hotelBeachImg}
          loop
          autoPlay
          muted
        >
          {/* <source src={hotelBeach} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        <StaySearchForm />
      </div>

      <div>
        <OfferMain active={"HOTELS"} />
      </div>

      <div>
        <GrnHomeStaticHotel />
      </div>
      <div>
        <HotelSuggestion />
      </div>
      <div>
        <TrendingPackageHome />
      </div>

      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Download />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <FooterNavigation />
      </div>
    </motion.div>
  );
};
export default GrmHotelHome;
