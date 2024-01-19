import React, { useEffect, useState } from "react";
// import goa from "../../../images/goa.jpg";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FastfoodIcon from "@mui/icons-material/Fastfood";
// import StarIcon from "@mui/icons-material/Star";
import CommitIcon from "@mui/icons-material/Commit";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CabinIcon from "@mui/icons-material/Cabin";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeckIcon from "@mui/icons-material/Deck";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import LandslideIcon from "@mui/icons-material/Landslide";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import PoolIcon from "@mui/icons-material/Pool";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ForestIcon from "@mui/icons-material/Forest";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KayakingIcon from "@mui/icons-material/Kayaking";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { Box, Typography } from "@mui/material";
import "./holidayinfo.css";
// import { useNavigate } from "react-router-dom";
// import Modal from "@mui/material/Modal";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";

import { SpinnerCircular } from "spinners-react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";
import loginGif from "../../../images/loginGif.gif"
import Login from "../../../components/Login"

import HolidayLoader from "../holidayLoader/HolidayLoader"
import HolidaySimilar from "./HolidaySimilar";

function Holidayinfo() {
  // const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;
  // console.log("One Package", onePackage);
  // const [daysDetailsValues, setDaysDetails] = useState([]);

  const [spinner, setSpinner] = useState(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleModalOpenConfirmation = () => setOpenConfirmationModal(true);
  const handleModalCloseConfirmation = () => setOpenConfirmationModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    // bgcolor: "background.paper",
    boxShadow: 10,
  };

  // const [value, setValue] = React.useState("1");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const authenticUser = reducerState?.logIn?.loginData?.status;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const handleModalClose = () => {
    setIsLoginModalOpen(false)
  }


  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser])


  // const savedDataString = sessionStorage.getItem("searchPackageData");
  // const savedData = JSON?.parse(savedDataString);
  // const savedDestination = savedData?.destination?.toUpperCase();
  // const savedDays = savedData?.days;

  // useEffect(() => {
  //   if (
  //     savedDataString === null ||
  //     (reducerState?.searchOneResult?.isLoading === true &&
  //       reducerState?.searchOneResult?.OneSearchPackageResult.length === 0)
  //   ) {
  //     navigate("/HolidayPackageSearchResult");
  //   }
  // }, [reducerState?.searchOneResult?.OneSearchPackageResult]);

  // function of enquiry for booking

  // const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    contact_number: "",
    departure_city: "",
    number_of_adult: Number(),
    number_of_child: Number(),
    // number_of_people: Number(),
    departure_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleClose = () => {
  //   setOpenModal((prev) => !prev);
  // };

  const token = sessionStorage.getItem("jwtToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    }

    else {

      setSpinner(true);


      const enquiryPayload = {
        packageId: onePackage?._id,
        email: formData.email,
        countryCode: "+91",
        fullName: formData.fullname,
        phone: formData.contact_number,
        departureCity: formData.departure_city,
        adults: formData.number_of_adult,
        child: formData.number_of_child,
        noOfPeople: Number(formData.number_of_adult + formData.number_of_child),
        departureDate: formData.departure_date,
        packageType: "tour",
      };
      const res = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/api/user/packageBookingEnquiry`,
        data: enquiryPayload,
        headers: {
          token: token,
        },
      });
      setSpinner(false);
      setTimeout(() => {
        handleModalOpenConfirmation();
      }, 1000);
      setFormData({
        email: "",
        fullname: "",
        contact_number: "",
        departure_city: "",
        number_of_people: Number(),
        departure_date: "",
      });
      // setOpenModal((prev) => !prev);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // function of enquiry for booking

  // console.log(onePackage, "one package")


  if (onePackage === undefined) {
    return (
      <div>
        <HolidayLoader />
      </div>
    )
  }


  return (
    <>
      <div className="holidayInfoBackWall">
        <div className="packInfoBackdrop">
          <img src={onePackage?.pakage_img} alt="" />
        </div>
        <div className="opacityPack">

        </div>
        <InsideNavbar />
      </div>

      <div className="container-lg mt-4" style={{ position: "relative" }}>
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-12 mb-0  packageImgBox">
                <div className="PackageImg">
                  <img src={onePackage?.pakage_img} alt="" />
                </div>
              </div>
              <div className="col-lg-12 mb-4 packageName">
                <div className="">
                  <p className="mb-3">{onePackage?.pakage_title}</p>
                  <div className="spanBackDesBox">
                    <span className="spanBackDes">
                      {`${onePackage?.days - 1}N`} / {`${onePackage?.days}D`}
                    </span>
                    {/* <p>+91-8287850111</p> */}
                  </div>
                </div>
                <hr style={{ borderColor: "lightgray" }} />
                <div className="numPri">
                  <div className="pckLockBox">
                    <div className="packageLocation">
                      <FmdGoodIcon />
                    </div>
                    <div>
                      {/* {onePackage?.destination?.map((i, index) => (
                        <p>{i}</p>
                      ))} */}
                      <p>{onePackage?.destination?.map(item => item.addMore).join(', ')}</p>

                      <span>{onePackage?.country !== "" ? `(${onePackage?.country})` : "(India)"}</span>
                    </div>
                  </div>

                  <div className="packPrice">
                    <p>
                      ₹ {onePackage?.pakage_amount?.amount}<span>/Person</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mb-4 p-0">
                <div className="TripHighlight">
                  <p className="mb-3">Trip Highlights</p>

                  <div className="col-lg-12 ">
                    <div className="icon-boxHighlight">
                      {onePackage?.insclusions?.map((ele, index) => {
                        if (
                          ele?.flexibility ||
                          ele?.train ||
                          ele?.bus ||
                          ele?.cab ||
                          ele?.moterBike ||
                          ele?.hotel ||
                          ele?.homeStays ||
                          ele?.guestHouse ||
                          ele?.cruise ||
                          ele?.sightSeeing ||
                          ele?.guide ||
                          ele?.meals ||
                          ele?.breakfast ||
                          ele?.drink ||
                          ele?.visa ||
                          ele?.travelInsurance ||
                          ele?.wildlife ||
                          ele?.heritage ||
                          ele?.adventure ||
                          ele?.beach ||
                          ele?.hillStation ||
                          ele?.nature ||
                          ele?.wellness ||
                          ele?.hiddenGem ||
                          ele?.tax ||
                          ele?.discount ||
                          ele?.waterActivities ||
                          ele?.optionalActivities ||
                          ele?.flexibleBooking ||
                          ele?.wifi
                        ) {
                          return (
                            <div key={index}>
                              {ele?.flexibility && (
                                <div className="singleIcon">
                                  <span>
                                    <CommitIcon />
                                  </span>
                                  <p>Flexibility</p>
                                </div>
                              )}
                              {ele?.train && (
                                <div className="singleIcon">
                                  <span>
                                    <TramIcon />
                                  </span>
                                  <p>Train</p>
                                </div>
                              )}
                              {ele?.bus && (
                                <div className="singleIcon">
                                  <span>
                                    <DirectionsBusIcon />
                                  </span>
                                  <p>Bus</p>
                                </div>
                              )}
                              {ele?.cab && (
                                <div className="singleIcon">
                                  <span>
                                    <DirectionsCarIcon />
                                  </span>
                                  <p>Cab</p>
                                </div>
                              )}
                              {ele?.moterBike && (
                                <div className="singleIcon">
                                  <span>
                                    <TwoWheelerIcon />
                                  </span>
                                  <p>Moterbike</p>
                                </div>
                              )}
                              {ele?.hotel && (
                                <div className="singleIcon">
                                  <span>
                                    <ApartmentIcon />
                                  </span>
                                  <p>Hotel</p>
                                </div>
                              )}
                              {ele?.homeStays && (
                                <div className="singleIcon">
                                  <span>
                                    <HolidayVillageIcon />
                                  </span>
                                  <p>Homestays</p>
                                </div>
                              )}
                              {ele?.guestHouse && (
                                <div className="singleIcon">
                                  <span>
                                    <LocationCityIcon />
                                  </span>
                                  <p>Guesthouse</p>
                                </div>
                              )}
                              {ele?.camp && (
                                <div className="singleIcon">
                                  <span>
                                    <CabinIcon />
                                  </span>
                                  <p>Camp</p>
                                </div>
                              )}
                              {ele?.cruise && (
                                <div className="singleIcon">
                                  <span>
                                    <BlurOnIcon />
                                  </span>
                                  <p>Cruise</p>
                                </div>
                              )}
                              {ele?.sightSeeing && (
                                <div className="singleIcon">
                                  <span>
                                    <DeckIcon />
                                  </span>
                                  <p>Sightseeing</p>
                                </div>
                              )}
                              {ele?.guide && (
                                <div className="singleIcon">
                                  <span>
                                    <EngineeringIcon />
                                  </span>
                                  <p>Guide</p>
                                </div>
                              )}
                              {ele?.meals && (
                                <div className="singleIcon">
                                  <span>
                                    <FastfoodIcon />
                                  </span>
                                  <p>Meals</p>
                                </div>
                              )}
                              {ele?.breakfast && (
                                <div className="singleIcon">
                                  <span>
                                    <DinnerDiningIcon />
                                  </span>
                                  <p>Daily Breakfast</p>
                                </div>
                              )}
                              {ele?.drink && (
                                <div className="singleIcon">
                                  <span>
                                    <LiquorIcon />
                                  </span>
                                  <p>Complimentary Drink</p>
                                </div>
                              )}
                              {ele?.visa && (
                                <div className="singleIcon">
                                  <span>
                                    <ArticleIcon />
                                  </span>
                                  <p>Visa</p>
                                </div>
                              )}
                              {ele?.travelInsurance && (
                                <div className="singleIcon">
                                  <span>
                                    <AccountBalanceIcon />
                                  </span>
                                  <p>Travel Insurance</p>
                                </div>
                              )}
                              {ele?.safeTravel && (
                                <div className="singleIcon">
                                  <span>
                                    <ParaglidingIcon />
                                  </span>
                                  <p>Safe to Travel</p>
                                </div>
                              )}
                              {ele?.wildlife && (
                                <div className="singleIcon">
                                  <span>
                                    <NaturePeopleIcon />
                                  </span>
                                  <p>Wildlife</p>
                                </div>
                              )}
                              {ele?.heritage && (
                                <div className="singleIcon">
                                  <span>
                                    <LandslideIcon />
                                  </span>
                                  <p>Heritage</p>
                                </div>
                              )}
                              {ele?.adventure && (
                                <div className="singleIcon">
                                  <span>
                                    <KitesurfingIcon />
                                  </span>
                                  <p>Adventure</p>
                                </div>
                              )}
                              {ele?.beach && (
                                <div className="singleIcon">
                                  <span>
                                    <PoolIcon />
                                  </span>
                                  <p>Beach</p>
                                </div>
                              )}
                              {ele?.hillStation && (
                                <div className="singleIcon">
                                  <span>
                                    <DownhillSkiingIcon />
                                  </span>
                                  <p>Hill Station</p>
                                </div>
                              )}
                              {ele?.nature && (
                                <div className="singleIcon">
                                  <span>
                                    <ForestIcon />
                                  </span>
                                  <p>Nature</p>
                                </div>
                              )}
                              {ele?.wellness && (
                                <div className="singleIcon">
                                  <span>
                                    <SelfImprovementIcon />
                                  </span>
                                  <p>Wellness</p>
                                </div>
                              )}
                              {ele?.hiddenGem && (
                                <div className="singleIcon">
                                  <span>
                                    <FitnessCenterIcon />
                                  </span>
                                  <p>Hidden Gem</p>
                                </div>
                              )}
                              {ele?.tax && (
                                <div className="singleIcon">
                                  <span>
                                    <FolderDeleteIcon />
                                  </span>
                                  <p>Price Inclusive Tax</p>
                                </div>
                              )}
                              {ele?.discount && (
                                <div className="singleIcon">
                                  <span>
                                    <LocalOfferIcon />
                                  </span>
                                  <p>50% Off</p>
                                </div>
                              )}
                              {ele?.waterActivities && (
                                <div className="singleIcon">
                                  <span>
                                    <KayakingIcon />
                                  </span>
                                  <p>Water Activities</p>
                                </div>
                              )}
                              {ele?.optionalActivities && (
                                <div className="singleIcon">
                                  <span>
                                    <SportsKabaddiIcon />
                                  </span>
                                  <p>Optional Activities</p>
                                </div>
                              )}
                              {ele?.flexibleBooking && (
                                <div className="singleIcon">
                                  <span>
                                    <BookmarkAddIcon />
                                  </span>
                                  <p>Flexible Booking</p>
                                </div>
                              )}
                              {ele?.wifi && (
                                <div className="singleIcon">
                                  <span>
                                    <WifiPasswordIcon />
                                  </span>
                                  <p>WIFI</p>
                                </div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mb-4 p-0">
                <div className="tripOverview">
                  <div className="col-lg-12">
                    <div className="overviewBox">
                      <span>Overview</span>
                      {/* <p>{onePackage?.overview}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: onePackage?.overview }}></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mb-4 p-0">


                {onePackage?.detailed_ltinerary?.map((item, index) => {
                  return (
                    <>
                      <Timeline
                        sx={{
                          [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                          },
                        }}
                      >
                        <TimelineItem className="timeLineDes">
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Box>
                              <Box py={1}> </Box>
                              <Accordion
                                style={{ width: "100%" }}
                                defaultActiveKey={
                                  index === 0 ? index.toString() : undefined
                                } // Set defaultActiveKey to index 0
                              >
                                <Accordion.Item eventKey={index.toString()}>
                                  <Accordion.Header>
                                    <Typography
                                      color="Black"
                                      fontSize="15px"
                                      fontWeight="bold"
                                    >
                                      Day {index + 1}
                                    </Typography>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <Typography
                                      sx={{
                                        color: "#666666",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {/* {item} */}
                                      <div dangerouslySetInnerHTML={{ __html: item }}></div>
                                    </Typography>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </Box>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </>
                  );
                })}
              </div>

              <div className="col-lg-12 mb-4 p-0">
                <div className="tripOverview">
                  <div className="col-lg-12">
                    <div className="overviewBox">
                      <span>Hotel Details</span>
                      {/* <p>{onePackage?.hotel_details}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: onePackage?.hotel_details }}></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4 p-0">
                <div className="tripOverview">
                  <div className="col-lg-12">
                    <div className="overviewBox">
                      <span>Inclusion</span>
                      {/* <p>{onePackage?.insclusion_note}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: onePackage?.insclusion_note }}></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4 p-0">
                <div className="tripOverview">
                  <div className="col-lg-12">
                    <div className="overviewBox">
                      <span>Exclusion</span>
                      {/* <p>{onePackage?.exclusion_note}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: onePackage?.exclusion_note }}></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4 p-0">
                <div className="tripOverview">
                  <div className="col-lg-12">
                    <div className="overviewBox">
                      <span>Term & Condition</span>
                      {/* <p>{onePackage?.term_Conditions}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: onePackage?.term_Conditions }}></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4 p-0">
                <div className="tripOverview">
                  <div className="col-lg-12">
                    <div className="overviewBox">
                      <span>Cancellation Policy</span>
                      {/* <p>{onePackage?.cancellation_Policy}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: onePackage?.cancellation_Policy }}></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-4 packageSideFormMain">
            <div
              className="packageSideForm"
              style={{ position: "sticky", top: "100px" }}
            >
              <div
                className="container"
                id="scrollfixInsideForm"
                style={{
                  height: "100%",
                  // overflow: "hidden", // Hide the scrollbar
                  overflowY: "scroll",
                }}
              >
                <p className="py-4 sidePackFormPara">
                  Enter your details to book
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="fullname"
                          placeholder="Enter Your Name"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          className="packSideInput"
                        />
                        {/* <label for="floatingInput">Enter Name</label> */}
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-3">
                      <div class="form-floating">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="packSideInput"
                        />
                        {/* <label for="floatingInput">Enter Email</label> */}
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="contact_number"
                          placeholder="Contact Number"
                          value={formData.contact_number}
                          onChange={handleInputChange}
                          className="packSideInput"
                        />
                        {/* <label for="floatingInput">Contact Number</label> */}
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="departure_city"
                          placeholder="Departure City"
                          value={formData.departure_city}
                          onChange={handleInputChange}
                          className="packSideInput"
                        />
                        {/* <label for="floatingInput">Departure City</label> */}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="number_of_adult"
                          min={1}
                          value={formData.number_of_adult}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Number of Adult</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="number_of_child"
                          // min={1}
                          value={formData.number_of_child}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Number of Child</label>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-3">
                      <div class="form-floating packDatePick">
                        <input
                          type="date"
                          name="departure_date"
                          value={formData.departure_date}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Journey Date</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="packEnqButton">
                        <button type="submit">
                          {spinner ? (
                            <SpinnerCircular size={30} сolor="#ffffff" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* confirmation modal  */}

          <Modal
            open={openConfirmationModal}
            onClose={handleModalCloseConfirmation}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="modal-boxChange">
                <form className="cancelForm">
                  <div className="confirmModal">
                    <h3>Thank You</h3>
                    <p>Your Query has been sent Successfully.</p>
                    <span>Our Representative will get back to you. </span>
                  </div>
                  <div className="historyCancelModal">
                    <button
                      className="second"
                      type="submit"
                      onClick={handleModalCloseConfirmation}
                    >
                      OK
                    </button>
                  </div>
                </form>
              </div>
            </Box>
          </Modal>

          {/* <div className="col-lg-12 mb-4">

            <div className="holiday_but">
              <button id="send_enquiry" onClick={() => setOpenModal((prev) => !prev)}>
                Send Enquiry for booking
              </button>
            </div>
          </div>

          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="modalBoxPackage">
              <div className="container">
                <form onSubmit={handleSubmit}>
                  <div className="row">



                    <div className="col-lg-6 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Enter Name</label>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 mb-3">
                      <div class="form-floating">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Enter Email</label>
                      </div>
                    </div>


                    <div className="col-lg-6 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Contact Number</label>
                      </div>
                    </div>


                    <div className="col-lg-6 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="departure_city"
                          value={formData.departure_city}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Departure City</label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="number_of_people"
                          min={1}
                          value={formData.number_of_people}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Number of People</label>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 mb-3">
                      <div class="form-floating packDatePick">
                        <input
                          type="date"
                          name="departure_date"
                          value={formData.departure_date}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Departure Date</label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="packEnqButton">
                        <button type="submit">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal> */}
        </div>
      </div>

      <div className="container p-0">
        <hr style={{ borderColor: "#999" }} />
      </div>

      <div>
        <HolidaySimilar />
      </div>


      <Modal
        open={isLoginModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: "999999" }}
      >
        <div class="login-page">
          <div class="container ">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-5 ">
                <div class="bg-white shadow roundedCustom">
                  <div class="">
                    <div class="col-md-12 ps-0  d-md-block">
                      <div class="form-right leftLogin h-100 text-white text-center ">
                        <CloseIcon className="closeIncon" onClick={handleModalClose} />
                        <div className="loginImg logg">
                          <img src={loginGif} alt="loginGif" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 pe-0">
                      <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">

                        <div class="row g-4">
                          <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                            <label className="mb-3">Please Login to Continue<span class="text-danger">*</span></label>

                          </div>
                          <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                            <Login />
                          </div>
                        </div>


                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Holidayinfo;

// <>
//   <div className='mainimg'>
//     <Navbar />
//     <BigNavbar />
//     <Mainheader />
//   </div>

// </>