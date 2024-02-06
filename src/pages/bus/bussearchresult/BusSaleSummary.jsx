import React, { useEffect, useState, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

const BusSaleSummary = () => {
    const [showInput, setShowInput] = useState(false);
    const [couponApplied, setCouponApplied] = useState(false);
    const inputRef = useRef(null);


    const reducerState = useSelector((state) => state);
    // console.log("reducerState", reducerState);
    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.busMarkup;
    // console.warn(markUpamount,"markup error")
    const [publishedPrice, setPublishedPrice] = useState(0);
    const [offerPrice, setOfferedPrice] = useState(0);
    const [tds, setTds] = useState(0);
    const seatData = sessionStorage.getItem("seatData");
    const parsedSeatData = JSON.parse(seatData);
    const seatObject = parsedSeatData?.blockedSeatArray;
    // console.log(seatObject);
    const published = seatObject.reduce(function (
        accumulator,
        currentValue,
        currentIndex,
        array
    ) {
        return accumulator + currentValue?.Price?.PublishedPriceRoundedOff;
    },
        0);
    const offeredPrice = seatObject.reduce(
        (accumulator, currentValue, currentIndex, array) => {
            return accumulator + currentValue?.Price?.OfferedPrice;
        },
        0
    );
    // const tdsTotal = markUpamount + seatObject.reduce((accumulator, currentValue) => {
    //     return accumulator + currentValue?.Price?.TDS;
    // }, 0);




    const grandTotal = published + markUpamount;

    const handleCoupon = () => {
        inputRef.current.focus();
    }

    const handleApplyCoupon = () => {
        setShowInput(true);
        setCouponApplied(true);
    };

    useEffect(() => {
        setOfferedPrice(offeredPrice);
        setPublishedPrice(published);
        // setTds(tdsTotal);
    }, []);
    return (


        <div className="priceSummaryHotel">
            <div className="head">
                <span>Price Summary</span>
            </div>
            <div className="priceChart">
                <div >
                    <span className="text-bold">Rate</span>
                    {/* <p>{hotelData?.Price?.RoomPrice}</p> */}
                </div>
                <div >
                    <span>Published</span>
                    <p>{'₹'}{publishedPrice}</p>
                </div>
                <div >
                    <span>Other Tax</span>
                    <p>{'₹'}{markUpamount}</p>
                </div>
            </div>
            <div className="TotGst">
                <div >
                    <span>Grand Total:</span>
                    <p>{'₹'}{grandTotal}</p>
                </div>
            </div>
            {/* 
            <div className="applycoupenbuttontext" style={{ overflow: 'hidden' }}>
                {!couponApplied ? (
                    <button onClick={handleApplyCoupon} className="applycoupen-button">
                        Apply Coupon
                    </button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }} // Adjust the duration as needed
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            className="inputfieldtext"
                            placeholder="Apply Coupon..."
                            autoFocus
                        />
                        <button onClick={handleCoupon} className="applycoupen-button1">Submit</button>
                    </motion.div>
                )}
            </div> */}



        </div>

    );
};

export default BusSaleSummary;
