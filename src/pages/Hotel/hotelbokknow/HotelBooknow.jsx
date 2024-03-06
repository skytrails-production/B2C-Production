import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./hotelbooknow.css";
import Hoteldetailaccordian from "./Hoteldetailaccordian";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import starsvg from "../../../images/star.svg"
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import chevrondown from "../../../images/chevrondown.svg"
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
import {
  clearHotelBlockRoom,
  // hotelBlockRoomAction,
  hotelRoomAction,
  hotelSearchInfoAction,
} from "../../../Redux/Hotel/hotel";
// import HotelLoading from "../hotelLoading/HotelLoading";
import Hotelmainloading from "../hotelLoading/Hotelmainloading";
import Swal from "sweetalert2"
import { swalModal } from "../../../utility/swal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };



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



const HotelBooknow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("State Data", reducerState);
  const [loader, setLoader] = useState(false);

  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  // console.warn(ResultIndex, HotelCode, "hoitel room ");
  useEffect(() => {
    dispatch(clearHotelBlockRoom())
  }, [])
  useEffect(() => {
    if (ResultIndex === null || HotelCode === null) {
      swalModal('hotel', "room not found", false);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",
      //   text: "room not found",
      //   timer: 2000,

      //   showClass: {
      //     popup: `
      //     animate__animated
      //     animate__fadeInUp
      //     animate__faster
      //   `
      //   },
      //   hideClass: {
      //     popup: `
      //     animate__animated
      //     animate__fadeOutDown
      //     animate__faster
      //   `
      //   }
      // })
      navigate("/hotel/hotelsearch")
    }
  }, [])

  useEffect(() => {
    const payload = {
      ResultIndex: ResultIndex,
      HotelCode: HotelCode,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId:
        reducerState?.hotelSearchResult?.ticketData?.data?.data
          ?.HotelSearchResult?.TraceId,
    };

    dispatch(hotelSearchInfoAction(payload));
    dispatch(hotelRoomAction(payload));
  }, []);
  useEffect(() => {
    if (reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error?.ErrorCode !== 0 && reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error?.ErrorCode !== undefined) {
      swalModal('hotel', reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error?.ErrorMessage, false);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",
      //   text: reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error?.ErrorMessage,

      //   showClass: {
      //     popup: `
      //     animate__animated
      //     animate__fadeInUp
      //     animate__faster
      //   `
      //   },
      //   hideClass: {
      //     popup: `
      //     animate__animated
      //     animate__fadeOutDown
      //     animate__faster
      //   `
      //   }
      // })
      navigate("/hotel/hotelsearch")

    }
    else if (reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult?.Error?.ErrorCode !== 0 && reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult?.Error?.ErrorCode !== undefined) {
      swalModal('hotel', reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult?.Error?.ErrorMessage, false)
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",
      //   text: reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult?.Error?.ErrorMessage,

      //   showClass: {
      //     popup: `
      //     animate__animated
      //     animate__fadeInUp
      //     animate__faster
      //   `
      //   },
      //   hideClass: {
      //     popup: `
      //     animate__animated
      //     animate__fadeOutDown
      //     animate__faster
      //   `
      //   }
      // })
      navigate("/hotel/hotelsearch")
    }


  }, [reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult?.Error?.ErrorCode, reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult?.Error?.ErrorCode])

  useEffect(() => {
    if (reducerState?.hotelSearchResult?.isLoadingHotelRoom == true) {
      setLoader(true);
    }
  }, [reducerState?.hotelSearchResult?.isLoadingHotelRoom]);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
        ?.HotelRoomsDetails.length >= 0
    ) {
      setLoader(false);
    }
  }, [
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.HotelRoomsDetails,
  ]);
  useEffect(() => {
    if (reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error
      ?.ErrorCode === 0) {
      setLoader(false);

      navigate("Reviewbooking");
    }
    else if (reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error
      ?.ErrorCode !== 0 && reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error
        ?.ErrorCode !== undefined) {
      swalModal('hotel', reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error?.ErrorMessage, false)
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",

      //   text: reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.Error?.ErrorMessage,

      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `
      //   }
      // })
      navigate("/");

    }
    // console.warn(reducerState?.hotelSearchResult?.blockRoom, "reducerState?.hotelSearchResult?.blockRoom")
  }, [reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult]);

  // console.log(reducerState?.hotelSearchResult, "reducerState?.hotelSearchResultcontinue")


  const hotelll = reducerState?.hotelSearchResult;
  // console.log(hotelll, "hotelll");

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;
  // console.log(hotelInfo, "hotel information")

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };
  const hotelContactNo = hotelInfo?.HotelDetails?.HotelContactNo;
  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  // console.log(result, "hotel result")

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });

  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  // const data = storedFormData?.dynamicFormData[0];
  // console.warn(reducerState, "reducer state")

  // console.warn(loader, "loader///////////////////////")
  // console.log(result?.HotelResults[0]?.StarRating);



  if (loader || reducerState?.hotelSearchResult?.isLoadingBlockRoom) {
    return (
      <Hotelmainloading />
    )
  }

  // console.log(hotelInfo, "hotel info")

  return (
    <>

      <div className='mainimgHotelSearch'>

        <InsideNavbar />
      </div>


      <section className="mt-4">

        <div className="container">
          <div className="row">

            <motion.div className="col-lg-12" variants={variants} initial="initial"
              whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
              <div className="row">
                <motion.div variants={variants} className="col-lg-12 mb-3">
                  <div className="hotelTitleBoxAccord">
                    <h3>{hotelInfo?.HotelDetails?.HotelName}</h3>

                    <div className="starIMMMG">
                      <div>
                        <span className="ratigText">Rating </span>{Array.from({ length: result?.HotelResults[0]?.StarRating }, (_, index) => (
                          <img key={index} src={starsvg} alt={`Star ${index + 1}`} />
                        ))}
                      </div>
                      <div>
                        <span className="ratigText">location : {storedFormData?.Destination}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* <motion.div variants={variants} className="col-lg-12 mb-4 packageImgBox" >

                  <div className="packageLocation">
                    <FmdGoodIcon />
                  </div>
                  <div>
                    <p>{storedFormData?.city}</p>
                    <span>(India)</span>
                  </div>
                </motion.div> */}
                <motion.div variants={variants} className="col-lg-12">
                  <div className="hotelImageBoxBook">
                    <h4>Discover the best of luxury</h4>
                    <div className="row">
                      {hotelInfo?.HotelDetails?.Images?.slice(1, 5).map((img, key) => {
                        return (
                          <motion.div variants={variants} className="col-lg-2 col-md-2">
                            <div className="dynamicHotelimg">
                              <img src={img} className="jacuzzy_img" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={variants} className="col-lg-12 my-4">
                  <div className="hotelBookHighlight">
                    <h4>Hotel Highlight</h4>
                    <div>
                      {
                        hotelInfo?.HotelDetails?.HotelFacilities.slice(0, 6).map((item, index) => {
                          return (
                            <p><img src={chevrondown} />{item}</p>
                          )
                        })
                      }
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>

          <motion.div variants={variants} className="row">
            <div className="col-lg-12">
              <Hoteldetailaccordian toggel={() => setLoader(true)} />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HotelBooknow;

