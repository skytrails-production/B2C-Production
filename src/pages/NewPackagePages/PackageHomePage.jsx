import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import NewHolidayCategory from "./holidayCategory/NewHolidayCategory";

import holidayBottom from "./holidayBottom.svg";
import holidayBottomMobile from "./holidayBottomMobile.svg";
import { useDispatch } from "react-redux";
import { clearHolidayReducer } from "../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import Img from "../../LazyLoading/Img";
import WhyChooseUs from "../../components/WhyChooseUs";
import seashore from "../../images/seashore.mp4";
import seashoreImg from "../../images/seashore.jpg";
import HolidaySearchForm from "../../components/TailwindSearchComp/heroSection/holidayForm/HolidaySearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
import PackageHomeAbsolute from "./PackageHomeAbsolute";
import Domestic from "./Domestic";
import { clearPackageData } from "../../Redux/SearchPackage/actionSearchPackage";
const PackageHomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearHolidayReducer());
    dispatch(clearPackageData());
  }, []);

  return (
    <div>
      <React.Fragment>
        <Helmet>
          <title>
            The Skytrails - Holiday Packages, Bus Booking, Hotel Booking, Flight
            Booking{" "}
          </title>
          <link rel="canonical" href="/holidaypackages" />
          <meta name="description" content="one packages" />
          <meta
            name="keywords"
            content=",family vacation packages,luxury travel deals,budget-friendly getaways,weekend escapes,city break packages     ,scuba diving holidays,cultural tours,skiing and snowboarding packages,wellness retreats,romantic getaways  ,7-day package deal to goa with flights,all-inclusive family fun at [resort name],off-the-beaten-path adventure tours in india,romantic spa getaways under [price],cruise with balcony cabin and shore excursions
          "
          />
        </Helmet>

        {/* <div className="flex md:hidden lg:hidden ">
          <NewPackageForm />
        </div> */}

        {/* <div
          className="flightMainBox relative py-28 pt-44 bg-[radial-gradient(circle,_rgba(189,22,15,1)_0%,_rgba(214,74,80,1)_100%)] hidden md:flex bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${newPackBanner})` }}
        >
          <HolidaySearchForm />
        </div> */}

        <div className="flightMainBox relative py-28 pt-44 flex md:flex bg-cover bg-top bg-no-repeat">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            poster={seashoreImg}
            loop
            autoPlay
            muted
          >
            <source src={seashore} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className=" z-10"> */}
          <HolidaySearchForm />
          {/* </div> */}
        </div>

        <PackageHomeAbsolute />
        <div>
          <OfferMain active={"HOLIDAYS"} />
        </div>

        <div>
          <NewHolidayCategory />
        </div>
        <div>
          <Domestic />
        </div>

        <div>
          {/* <NewHolidayTrending /> */}
          <TrendingPackageHome />
        </div>

        <div className="my-3 mt-5">
          <div className="justify-center w-full  custom-container d-none d-md-flex holiBot">
            <img
              className="w-full object-cover"
              src={holidayBottom}
              alt="trip"
            />
          </div>
          <div className="container d-flex w-100 d-md-none holiBotMobile">
            <img
              style={{ width: "100%" }}
              src={holidayBottomMobile}
              alt="trip"
            />
          </div>
        </div>

        <div>
          <WhyChooseUs />
        </div>
        <div>
          <Testimonials />
        </div>
        <div>
          <Faq />
        </div>
        <div>
          <FooterNavigation />
        </div>
      </React.Fragment>
    </div>
  );
};

export default PackageHomePage;
