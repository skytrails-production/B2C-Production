import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HotelGuestDetailsGRN from "./HotelGuestDetailsGRN";
import PriceSummaryGRN from "./PriceSummaryGRN";
import { Skeleton, Space } from "antd";
import { motion } from "framer-motion";
import { swalModal } from "../../utility/swal";
import { Navigate, useNavigate } from "react-router-dom";
import HotelGalleryCarousel from "./HotelGalleryCarousel";
import "./bookingDetailsGRN.scss";
import HotelSelectRoomSkeleton from "./Skeletons/HotelSelectRoomSkeleton";

const BookingDetailsGRN = () => {
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.hotelRoom?.length > 0 ||
      reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel
    ) {
      setLoader(false);
    }
  }, [reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel]);

  useEffect(() => {
    if (reducerState?.hotelSearchResultGRN?.hotelRoom?.errors?.length > 0) {
      swalModal("hotel", "Session Expired", false);
      navigate("/st-hotel");
    }
  }, [reducerState?.hotelSearchResultGRN?.hotelRoom?.errors]);

  const hotelGallery =
    reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
      ?.regular;

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {loader ? (
        <>
          <HotelSelectRoomSkeleton />
        </>
      ) : (
        <div className="my-4 md:pb-8 bg-white">
          <div className="container">
            <div className="row">
              <HotelGalleryCarousel data={hotelGallery} />
            </div>

            <div className="row mt-3">
              <div className="col-lg-8">
                <HotelGuestDetailsGRN ref={formRef} />
              </div>
              <div className="col-lg-4">
                <PriceSummaryGRN />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDetailsGRN;
