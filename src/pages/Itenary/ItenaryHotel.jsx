import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import starsvg from "../../images/star.svg";
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

import freeWifi from "../GRMHotel/SVGs/freeWifi.svg"
import freeBreakfast from "../GRMHotel/SVGs/freeBreakfast.svg"
import freeParking from "../GRMHotel/SVGs/freeParking.svg"
import drinkingWater from "../GRMHotel/SVGs/DrinkingWater.svg"
import expressCheckin from "../GRMHotel/SVGs/expressCheckin.svg"
import welcomeDrink from "../GRMHotel/SVGs/welcomeDrink.svg"
import freeGym from "../GRMHotel/SVGs/freeGym.svg"


import dayjs from "dayjs";
import HotelLists from "./HotelLists";
import { fetchHotelSelectedRoomRequest, setHotelRoomSelectionRequest } from "../../Redux/Itenary/itenary";
import { apiURL } from "../../Constants/constant";
import axios from "axios";

const ItenaryHotel = () => {
    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    const hotelRoomnew = reducerState?.Itenerary?.selectedHotelRoom;
    const result = reducerState?.Itenerary?.hotelResultArray || [];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const markUpamount = reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;
    const [selectedHotel, setSelectedHotel] = useState([]);
    const [hotelChangeLoading, setHotelChangeLoading] = useState(false);
    const [roomLoader, setRoomLoader] = useState({});
    const [hotelIndex, setHotelIndex] = useState(0);
    const [isRoomFunctionInvoked, setIsRoomFunctionInvoked] = useState(false);
    const [roomDetails, setRoomDetails] = useState([]);

    const [latestHotelDet, setLatestHotelDet] = useState(reducerState?.Itenerary?.selectedHotelRoom);

    useEffect(() => {
        setLatestHotelDet(reducerState?.Itenerary?.selectedHotelRoom)
    }, [reducerState?.Itenerary?.selectedHotelRoom, selectedHotel])

    const parseDate = (dateString) => {
        const [year, month, day] = dateString?.split('-');
        return new Date(year, month - 1, day);
    };

    const getSortedResults = (results) => {
        return [...results].sort((a, b) => {
            const dateA = parseDate(a?.data?.data?.HotelSearchResult?.CheckInDate);
            const dateB = parseDate(b?.data?.data?.HotelSearchResult?.CheckInDate);
            return dateA - dateB;
        });
    };

    const sortedResults = useMemo(() => getSortedResults(result), [result]);

    useEffect(() => {
        if (sortedResults.length > 0) {
            const results = sortedResults.map(item => ({
                ...item?.data?.data?.HotelSearchResult?.HotelResults?.[0],
                selectedRoom: null
            }));
            setSelectedHotel(results);
            dispatch(fetchHotelSelectedRoomRequest(results))
        }
    }, [sortedResults]);

    const GetRoomFunction = async (item, index) => {

        setRoomLoader((prev) => ({ ...prev, [index]: true }));
        setIsRoomFunctionInvoked(true);
        const payload = {
            ResultIndex: item?.ResultIndex,
            HotelCode: item?.HotelCode,
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: sortedResults?.[index]?.data?.data?.HotelSearchResult?.TraceId,
        };

        try {
            const res = await axios({
                method: "post",
                url: `${apiURL.baseURL}/skyTrails/hotel/room`,
                data: payload,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res?.data?.data?.GetHotelRoomResult?.HotelRoomsDetails?.length > 0) {
                setRoomDetails(res.data.data.GetHotelRoomResult.HotelRoomsDetails);
                setHotelIndex(index);  // Set the current hotel index
                showModal();
            }

        } catch (error) {
            console.error('Error handling room function:', error);
        } finally {
            setRoomLoader((prev) => ({ ...prev, [index]: false }));
        }
    };

    const handleRoomSelect = (room) => {
        const updatedHotels = [...selectedHotel];
        updatedHotels[hotelIndex].selectedRoom = room;
        setSelectedHotel(updatedHotels);

        handleOk();
    };

    useEffect(() => {
        dispatch(fetchHotelSelectedRoomRequest(selectedHotel))
    }, [selectedHotel])

    const handleHotelClick = (hotelData, index) => {
        const updatedHotels = [...latestHotelDet];
        updatedHotels[hotelIndex] = hotelData;
        setLatestHotelDet(updatedHotels);
        setHotelChangeLoading(false);
        handleOk2();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };



    return (
        <>
            {latestHotelDet?.map((item, index) => (
                <div key={index}>
                    <div className="headingItenary">
                        <h6>Stays in {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[index]?.from?.Destination} {" "} {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[index]?.night} {" "} Nights </h6>
                    </div>
                    <div className="dayWiseItenaryMainBox mb-3">
                        <div className="dayWiseItenaryInnerBox">
                            <div className="hotelResultBoxSearch">
                                <div>
                                    <div className="hotelImage">
                                        <img
                                            src={item?.HotelPicture === "https://b2b.tektravels.com/Images/HotelNA.jpg" ? hotelNotFound : item?.HotelPicture}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = hotelNotFound;
                                            }}
                                            alt="package-img"
                                        />
                                    </div>
                                    <div className="hotelResultDetails">
                                        <div className="hotleTitle">
                                            <h6 className="mb-0">{item?.HotelName}</h6>
                                        </div>
                                        <div className="hotelRating">
                                            <div>
                                                {Array.from({ length: item?.StarRating }, (_, index) => (
                                                    <img key={index} src={starsvg} alt={`Star ${index + 1}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="">{item?.HotelAddress}</p>
                                        </div>
                                        {item?.HotelLocation && (
                                            <div>
                                                <p className="hotAddressLocation">
                                                    <span>
                                                        <svg height="17" viewBox="0 0 32 32" width="17" xmlns="http://www.w3.org/2000/svg" id="fi_3138736"><g id="Pin-2" data-name="Pin"><path fill="#d90429" d="m25.0464 8.4834a10 10 0 0 0 -7.9116-5.4258 11.3644 11.3644 0 0 0 -2.2691 0 10.0027 10.0027 0 0 0 -7.9121 5.4253 10.8062 10.8062 0 0 0 1.481 11.8936l6.7929 8.2588a1 1 0 0 0 1.545 0l6.7929-8.2588a10.8055 10.8055 0 0 0 1.481-11.8931zm-9.0464 8.5166a4 4 0 1 1 4-4 4.0047 4.0047 0 0 1 -4 4z"></path></g></svg>
                                                    </span>{item?.HotelLocation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                {item.selectedRoom && (
                                    // <div className="selectedRoomDetails">
                                    //     <h6>Selected Room:</h6>
                                    //     <p>{item.selectedRoom.RoomType}</p>
                                    //     <p>{item.selectedRoom.RoomDescription}</p>
                                    // </div>

                                    <div className="roomCompo" >
                                        <div className="offer_area" >

                                            <div>
                                                <div className="insideOffer">

                                                    <div className="inneraccorHotel">
                                                        <div className="ratePlan" >
                                                            <p className="insideOfferText">{item.selectedRoom?.RoomTypeName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="othInc">
                                                    {item.selectedRoom?.IsPANMandatory && (
                                                        <div className="othIncInner">
                                                            <div className="d-flex justify-content-start align-items-center gap-2">
                                                                <p className="panDesign">Pan Required</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {item.selectedRoom?.non_refundable && (
                                                        <div className="othIncInner">
                                                            <div className="d-flex justify-content-start align-items-center gap-2">
                                                                <p className="panDesign2">Non Refundable</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {item.selectedRoom?.LastCancellationDate && (
                                                        <div className="othIncInner">
                                                            <div className="d-flex justify-content-start align-items-center gap-2">
                                                                <p className="panDesign3">
                                                                    Refundable (Cancel Before {dayjs(item.selectedRoom?.LastCancellationDate).format("DD MMM, YY")})
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="othInc">
                                                    {item.selectedRoom?.Amenity?.[0]?.split(',').map((inclusion, e) => {
                                                        const trimmedInclusion = inclusion.trim().toLowerCase();

                                                        return (
                                                            <div className="othIncInner" key={e}>
                                                                <div className="d-flex justify-content-start align-items-center gap-2">
                                                                    {trimmedInclusion === "free wifi" && (
                                                                        <>
                                                                            <img src={freeWifi} alt="wifi" />
                                                                            <p className="panDesign3">Free WiFi</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "free internet" && (
                                                                        <>
                                                                            <img src={freeWifi} alt="wifi" />
                                                                            <p className="panDesign3">Free internet</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "free breakfast" && (
                                                                        <>
                                                                            <img src={freeBreakfast} alt="breakfast" />
                                                                            <p className="panDesign3">Free Breakfast</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "free self parking" && (
                                                                        <>
                                                                            <img src={freeParking} alt="parking" />
                                                                            <p className="panDesign3">Free Self Parking</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "parking" && (
                                                                        <>
                                                                            <img src={freeParking} alt="parking" />
                                                                            <p className="panDesign3">Parking</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "free parking" && (
                                                                        <>
                                                                            <img src={freeParking} alt="parking" />
                                                                            <p className="panDesign3">Free Parking</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "free valet parking" && (
                                                                        <>
                                                                            <img src={freeParking} alt="valet parking" />
                                                                            <p className="panDesign3">Free Valet Parking</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "drinking water" && (
                                                                        <>
                                                                            <img src={drinkingWater} alt="drinking water" />
                                                                            <p className="panDesign3">Drinking Water</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "express check-in" && (
                                                                        <>
                                                                            <img src={expressCheckin} alt="express check-in" />
                                                                            <p className="panDesign3">Express Check-in</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "welcome drink" && (
                                                                        <>
                                                                            <img src={welcomeDrink} alt="welcome drink" />
                                                                            <p className="panDesign3">Welcome Drink</p>
                                                                        </>
                                                                    )}
                                                                    {trimmedInclusion === "free fitness center access" && (
                                                                        <>
                                                                            <img src={freeGym} alt="fitness center" />
                                                                            <p className="panDesign3">Free Fitness Center Access</p>
                                                                        </>
                                                                    )}
                                                                </div>

                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="priceCheck">
                                                <span style={{ fontWeight: "600", fontSize: "15px", }}>₹  {(Number(markUpamount) * Number(item.selectedRoom?.Price?.PublishedPriceRoundedOff) + Number(item.selectedRoom?.Price?.PublishedPriceRoundedOff)).toFixed(0)}</span>


                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="addActvityRoomItenary mt-4 d-flex gap-2 justify-content-end">
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    danger
                                    onClick={() => {
                                        GetRoomFunction(item, index);
                                    }}
                                    loading={roomLoader[index]}
                                >
                                    Select Room
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<SyncOutlined />}
                                    warning
                                    onClick={() => {
                                        setHotelChangeLoading(true);
                                        setHotelIndex(index);
                                        showModal2();
                                    }}
                                    loading={hotelChangeLoading && hotelIndex === index}
                                >
                                    Change Hotel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <Modal width={1500} title="Select Room" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    {roomDetails.map((room, index) => (
                        // <div key={index} onClick={() => handleRoomSelect(room)} className="roomDetail">
                        //     <h6>{room.RoomType}</h6>
                        //     <p>{room.RoomDescription}</p>
                        // </div>
                        <div key={index} className="offer_area" onClick={() => handleRoomSelect(room)}>
                            <div className="inneraccorHotel">
                                <div className="roomTypeName">
                                    <p className="first">{room?.RoomTypeName}</p>
                                </div>

                                <div className="ratePlan">
                                    {/* <input
                                        className="form-check-input"
                                        type="checkbox"
                                        style={{ width: "25px", height: "25px" }}
                                        value={filteredComponent[0]?.RoomIndex}
                                        disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
                                        checked={!filteredComponent[0].disabled}
                                        onClick={handleSelectRoom}
                                    /> */}
                                    <p className="text">{room?.RatePlanName}</p>
                                </div>
                                <div className="smolking">
                                    <p>Smoking Preference: {" "}{room?.SmokingPreference}</p>
                                </div>
                                {/* <p className="text">
                                    Last Cancellation till: {displayText}
                                </p> */}
                            </div>
                            <div className="priceCheck">
                                <p className="price">₹{Number(markUpamount) * Number(room?.Price?.PublishedPriceRoundedOff) + Number(room?.Price?.PublishedPriceRoundedOff)}</p>
                                <div>
                                    <h3>Select Room</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal width={1500} title="Select Activity" open={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                <div className="">
                    <HotelLists result={sortedResults[hotelIndex]?.data?.data?.HotelSearchResult} onHotelClick={handleHotelClick} />
                </div>
            </Modal>
        </>
    );
};

export default ItenaryHotel;
