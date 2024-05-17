import React, { useEffect, useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FastfoodIcon from "@mui/icons-material/Fastfood";
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
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { Box, Typography } from "@mui/material";
import "./holidayinfo.css";
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
import loginnew from "../../../images/login-01.jpg"
import Login from "../../../components/Login"
import HolidayLoader from "../holidayLoader/HolidayLoader"
import HolidaySimilar from "./HolidaySimilar";
import { validateEmail, validatePhoneNumber } from "../../../utility/validationFunctions"
import { formatDate } from "../../../utility/utils"
import { searchOnePackageAction } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import { useParams } from "react-router";
import SharePackages from "./SharePackages";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import SecureStorage from "react-secure-storage";


const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};


const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function Holidayinfo() {






  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;

  const [spinner, setSpinner] = useState(false);
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const handleAdultCount = (icon) => {
    // console.warn(icon, "icon")
    if (icon === "add") {
      setAdultCount((pre) => pre + 1)
    }
    else if (icon === "sub" && 1 < adultCount) {
      setAdultCount((pre) => pre - 1)
    }
    return
  }
  const handleChildCount = (icon) => {
    // console.warn(icon, "icon")
    if (icon === "add") {
      setChildCount((pre) => pre + 1)
    }
    else if (icon === "sub" && 0 < childCount) {
      setChildCount((pre) => pre - 1)
    }
    return
  }




  // image slider logic


  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, onePackage?.package_img.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [page]);

  // image slider logic





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


  const authenticUser = reducerState?.logIn?.loginData?.status;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const handleModalClose = () => {
    setIsLoginModalOpen(false)
  }
  const currentdate = new Date();
  const mindate = formatDate(currentdate)


  const { id } = useParams();



  useEffect(() => {
    const payload = {
      id,
    };
    dispatch(searchOnePackageAction(payload));


  }, [])

  const destination = onePackage?.country;
  const days = 0
  const sessionPayload = {
    destination: destination,
    days: days,
  }
  sessionStorage.setItem("searchPackageData", JSON.stringify(sessionPayload));

  // console.log(reducerState, "reducer")


  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser])



  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    contact_number: "",
    departure_city: "",
    number_of_adult: Number(),
    number_of_child: Number(),
    // number_of_people: Number(),
    departure_date: "",
    // valtrue: false
  });
  const [sub, setSub] = useState(false)
  const [valtrue, setValtrue] = useState(false)

  const validationFrom = () => {
    // console.log(formData.fullname === "", !validateEmail(formData.email), !validatePhoneNumber(formData.contact_number), formData.departure_city === "", formData.departure_date, Number(formData.number_of_adult) < 1)
    if (formData.fullname === "" || !validateEmail(formData.email) || !validatePhoneNumber(formData.contact_number) || formData.departure_city === "" || formData.departure_date === "") {
      setValtrue(false)

      return
    }
    else {
      setValtrue(true)

      return
    }
  }

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    // console.log(name, "nameeee", value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {

    validationFrom()
  }, [formData])

  // const handleClose = () => {
  //   setOpenModal((prev) => !prev);
  // };

  const token = SecureStorage.getItem("jwtToken");

  const handleSubmit = async (e) => {
    // e.preventDefault();
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
        adults: adultCount,
        child: childCount,
        noOfPeople: Number(adultCount + childCount),
        departureDate: formData.departure_date,
        packageType: "tour",
      };
      await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/api/user/packageBookingEnquiry`,
        data: enquiryPayload,
        headers: {
          token: token,
        },
      }).then(function (response) {
        // console.log(response);
        handleModalOpenConfirmation();
        setFormData({
          email: "",
          fullname: "",
          contact_number: "",
          departure_city: "",
          number_of_people: Number(),
          departure_date: "",
        });
        setChildCount(0);
        setAdultCount(1);
        setSpinner(false);
        setSub(false)
      })
        .catch(function (error) {
          console.log(error);
          setSpinner(false);
          setSub(false)
        });
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  if (onePackage?.country === undefined) {
    return (
      <div>
        <HolidayLoader />
      </div>
    )
  }


  // console.log(onePackage, "one package")


  return (
    <>
      <div className="holidayInfoBackWall">
        <div className="packInfoBackdrop">
          <img src={onePackage?.pakage_img} alt="bann" />

        </div>
        <div className="opacityPack">

        </div>
      </div>

      <div className="container-lg mt-4" style={{ position: "relative" }}>
        <div className="row">
          <div className="col-lg-8">
            <div className="row MobileDesign">
              <div className="col-lg-12 mb-0  packageImgBox">
                <div className="PackageImg">
                  {
                    onePackage?.package_img.length > 0 ? (
                      <>
                        <AnimatePresence initial={false} custom={direction}>


                          <motion.img
                            key={page}
                            // src={images[imageIndex]}
                            src={onePackage?.package_img[imageIndex]}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              x: { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                              const swipe = swipePower(offset.x, velocity.x);

                              if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                              } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                              }
                            }}
                          />


                        </AnimatePresence>
                        <div className="next" onClick={() => paginate(1)}>
                          <svg enable-background="new 0 0 256 256" height="12" viewBox="0 0 256 256" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_9903638"><g id="_x30_7_Arrow_Right"><g><path d="m228.992 146.827-180.398 103.224c-17.497 9.998-38.04-7.264-31.166-26.206l34.642-95.842-34.642-95.843c-6.874-18.982 13.669-36.205 31.166-26.207l180.398 103.224c14.606 8.319 14.568 29.331 0 37.65z"></path></g></g></svg>
                        </div>
                        <div className="prev" onClick={() => paginate(-1)}>
                          <svg enable-background="new 0 0 256 256" height="12" viewBox="0 0 256 256" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_9903638"><g id="_x30_7_Arrow_Right"><g><path d="m228.992 146.827-180.398 103.224c-17.497 9.998-38.04-7.264-31.166-26.206l34.642-95.842-34.642-95.843c-6.874-18.982 13.669-36.205 31.166-26.207l180.398 103.224c14.606 8.319 14.568 29.331 0 37.65z"></path></g></g></svg>
                        </div>
                      </>
                    ) :

                      (
                        <img src={onePackage?.pakage_img} alt="banned" />
                      )
                  }




                  <SharePackages id={onePackage?._id} />
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


          <div className="col-lg-4 pe-lg-0 packageSideFormMain">
            <div
              className="packageSideForm"
            >
              <div
                className="container"
                id="scrollfixInsideForm"

              >
                <p className="py-4 sidePackFormPara">
                  Enter your details to book
                </p>

                <div >
                  <div className="row p-4">
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
                        {sub && formData.fullname === "" && <span className="floatingSpan">Please Fill Your Name</span>}
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
                        {sub && !validateEmail(formData.email) && <span className="floatingSpan">Please enter a valid email</span>}
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
                        {sub && !validatePhoneNumber(formData.contact_number) && <span className="floatingSpan">Enter a valid 10 digit number</span>}
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
                        {sub && formData.departure_city === "" && <span className="floatingSpan">Please Fill City</span>}
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-3">
                      <div class="form-floating packDatePick">
                        <input
                          type="date"
                          name="departure_date"
                          min={mindate}
                          value={formData.departure_date}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <label for="floatingInput">Journey Date</label>
                        {sub && formData.departure_date === "" && <span className="floatingSpan">Enter Departure Date</span>}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 mb-3 ">
                      <div className="adult_count_div">
                        <div className="adult_cout_lable_div">
                          Number of Adult
                        </div>
                        <div className='adult_count'>

                          <div className="adult_count_box"
                            onClick={() => handleAdultCount("sub")}
                          >-</div>
                          <div className="adult_count_box_input">{adultCount}</div>
                          <div className="adult_count_box"
                            onClick={() => handleAdultCount("add")}
                          >+</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 mb-3 ">
                      <div className="adult_count_div">
                        <div className="adult_cout_lable_div">
                          Number of Child
                        </div>
                        <div className='adult_count'>

                          <div className="adult_count_box"
                            onClick={() => handleChildCount("sub")}
                          >-</div>
                          <div className="adult_count_box_input">{childCount}</div>
                          <div className="adult_count_box"
                            onClick={() => handleChildCount("add")}
                          >+</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="packEnqButton">
                        {!valtrue ? <button className="disableBTN" onClick={() => setSub(true)}>Submit</button> :
                          <button onClick={handleSubmit}>
                            {spinner ? (
                              <SpinnerCircular size={30} сolor="#ffffff" />
                            ) : (
                              "Submit"
                            )}
                          </button>}
                      </div>
                    </div>
                  </div>
                </div>
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
                          <img src={loginnew} alt="loginnew" />
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

