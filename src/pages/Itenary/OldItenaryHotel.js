import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import starsvg from "../../images/star.svg";
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import dayjs from "dayjs";
import HotelLists from "./HotelLists";
import { fetchHotelSelectedRoomRequest, setHotelRoomSelectionRequest } from "../../Redux/Itenary/itenary";

const ItenaryHotel = () => {
    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    const hotelRoomnew = reducerState?.Itenerary?.selectedHotelRoom;



    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const result = reducerState?.Itenerary?.hotelResultArray || [];
    const [disabledOption, setDisabledOption] = useState(
        reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
            ?.RoomCombinations?.RoomCombination[0]?.RoomIndex
    );
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState([]);
    const [roomChangeLoading, setroomChangeLoading] = useState(false)

    const parseDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
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
            const results = sortedResults.map(item => item?.data?.data?.HotelSearchResult?.HotelResults[0]);
            setSelectedHotel(results);
        }
    }, [sortedResults]);



    const [isRoomFunctionInvoked, setIsRoomFunctionInvoked] = useState(false);
    const [roomLoader, setRoomLoader] = useState(false);
    const [hotelIndex, setHotelIndex] = useState(0);

    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;

    const GetRoomFunction = (item, index) => {

        console.log(item, index, "item and index ")

        // if (selectedRoom == null) {
        setRoomLoader(true);
        setIsRoomFunctionInvoked(true);
        const payload = {
            ResultIndex: item?.ResultIndex,
            HotelCode: item?.HotelCode,
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: sortedResults?.[index]?.data?.data?.HotelSearchResult?.TraceId,
        };

        try {
            // dispatch(hotelSearchInfoAction(payload));
            dispatch(fetchHotelSelectedRoomRequest(payload));
            // dispatch(hotelRoomAction(payload));
        } catch (error) {
            console.error('Error handling room function:', error);
        }
        // } else {
        // showModal();
        // }
    };

    useEffect(() => {
        if (isRoomFunctionInvoked && reducerState?.Itenerary?.isLoading === false) {
            setRoomLoader(false);
            showModal();
            setIsRoomFunctionInvoked(false);
        }
    }, [reducerState?.Itenerary?.isLoading, isRoomFunctionInvoked]);

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

    const handleHotelClick = (hotelData) => {
        const updatedHotels = [...selectedHotel];
        updatedHotels[hotelIndex] = hotelData;
        setSelectedHotel(updatedHotels);
        setroomChangeLoading(false)
        handleOk2();
    };

    const roomComponent = (RoomIndex, RoomIndexArr, col, row) => {
        const firstFilteredArray = hotelRoomnew?.[0]?.data?.data?.GetHotelRoomResult?.HotelRoomsDetails?.map((item) => {
            if (disabledOption?.includes(item?.RoomIndex)) {
                return { ...item, disabled: false };
            } else {
                return { ...item, disabled: true };
            }
        });
        const filteredComponent = firstFilteredArray?.filter((item) => {
            return item?.RoomIndex == RoomIndex;
        });

        const currData = new Date();
        const formattedDate = dayjs(filteredComponent[0]?.LastCancellationDate).format("DD MMM, YY");

        let displayText;
        if (currData > dayjs(filteredComponent[0]?.LastCancellationDate)) {
            displayText = "No Cancellation";
        } else {
            displayText = formattedDate;
        }

        const handleSelectRoom = async () => {
            setSelectedRoom(filteredComponent[0]);
            dispatch(setHotelRoomSelectionRequest(filteredComponent[0]));
            setDisabledOption(RoomIndexArr);
            setIsModalVisible(false);
        };

        return (
            <div className="offer_area">
                <div className="inneraccorHotel">
                    <div className="roomTypeName">
                        <p className="first">{filteredComponent[0]?.RoomTypeName}</p>
                    </div>

                    <div className="ratePlan">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            style={{ width: "25px", height: "25px" }}
                            value={filteredComponent[0]?.RoomIndex}
                            disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
                            checked={!filteredComponent[0].disabled}
                            onClick={handleSelectRoom}
                        />
                        <p className="text">{filteredComponent[0]?.RatePlanName}</p>
                    </div>
                    <div className="smolking">
                        <p>Smoking Preference: {" "}{filteredComponent[0]?.SmokingPreference}</p>
                    </div>
                    <p className="text">
                        Last Cancellation till: {displayText}
                    </p>
                </div>
                <div className="priceCheck">
                    <p className="price">₹{Number(markUpamount) * Number(filteredComponent[0]?.Price?.PublishedPriceRoundedOff) + Number(filteredComponent[0]?.Price?.PublishedPriceRoundedOff)}</p>
                    <div>
                        <h3 onClick={handleSelectRoom}>Select Room</h3>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {selectedHotel?.map((item, index) => (
                <>
                    <div className="headingItenary">
                        <h6>Stays in {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[index]?.from?.Destination} {" "} {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[index]?.night} {" "} Nights </h6>
                    </div>
                    <div className="dayWiseItenaryMainBox mb-3">
                        <div className="dayWiseItenaryInnerBox" key={index}>
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

                            {selectedRoom && (
                                <div className="roomCompo">
                                    <div className="offer_area">
                                        <div>
                                            <div className="insideOffer">
                                                <div className="inneraccorHotel">
                                                    <div className="ratePlan">
                                                        <p className="insideOfferText">{selectedRoom?.RoomTypeName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="addActvityRoomItenary mt-4 d-flex gap-2 justify-content-end">
                                <Button type="primary" icon={<PlusOutlined />} danger onClick={() => GetRoomFunction(item, index)} loading={roomLoader}>
                                    {selectedRoom !== null ? "Change Room" : "Select Room"}
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<SyncOutlined />}
                                    warning
                                    onClick={() => {
                                        setroomChangeLoading(true)
                                        setHotelIndex(index);
                                        showModal2();
                                    }}
                                    loading={roomChangeLoading}
                                >
                                    Change Hotel
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            <Modal width={800} title="Select Activity" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {hotelRoomnew?.[0]?.data?.data?.GetHotelRoomResult?.RoomCombinations?.RoomCombination.map((item1, index1) => (
                    <div className="container" key={index1}>
                        <div className="row">
                            <div className="col-lg-12">
                                {item1?.RoomIndex?.map((item2, index2) => {
                                    if (index2 == 0) {
                                        return (
                                            <div className="roomCompo" key={index2}>
                                                {roomComponent(item2, item1?.RoomIndex, index2, index1)}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </Modal>

            <Modal width={1500} title="Select Activity" open={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                <div className="">
                    <HotelLists result={result[hotelIndex]?.data?.data?.HotelSearchResult} onHotelClick={handleHotelClick} />
                </div>
            </Modal>
        </>
    );
};

export default ItenaryHotel;


















// {
//     selectedRoom && (

//         <div className="roomCompo" >
//             <div className="offer_area" >

//                 <div>
//                     <div className="insideOffer">

//                         <div className="inneraccorHotel">
//                             <div className="ratePlan" >
//                                 <p className="insideOfferText">{selectedRoom?.RoomTypeName}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="othInc">
//                         {selectedRoom?.IsPANMandatory && (
//                             <div className="othIncInner">
//                                 <div className="d-flex justify-content-start align-items-center gap-2">
//                                     <p className="panDesign">Pan Required</p>
//                                 </div>
//                             </div>
//                         )}
//                         {selectedRoom?.non_refundable && (
//                             <div className="othIncInner">
//                                 <div className="d-flex justify-content-start align-items-center gap-2">
//                                     <p className="panDesign2">Non Refundable</p>
//                                 </div>
//                             </div>
//                         )}
//                         {selectedRoom?.LastCancellationDate && (
//                             <div className="othIncInner">
//                                 <div className="d-flex justify-content-start align-items-center gap-2">
//                                     <p className="panDesign3">
//                                         Refundable (Cancel Before {dayjs(selectedRoom?.LastCancellationDate).format("DD MMM, YY")})
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <div className="othInc">
//                         {selectedRoom?.Amenity?.[0]?.split(',').map((inclusion, e) => {
//                             const trimmedInclusion = inclusion.trim().toLowerCase();

//                             return (
//                                 <div className="othIncInner" key={e}>
//                                     <div className="d-flex justify-content-start align-items-center gap-2">
//                                         {trimmedInclusion === "free wifi" && (
//                                             <>
//                                                 <img src={freeWifi} alt="wifi" />
//                                                 <p className="panDesign3">Free WiFi</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free internet" && (
//                                             <>
//                                                 <img src={freeWifi} alt="wifi" />
//                                                 <p className="panDesign3">Free internet</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free breakfast" && (
//                                             <>
//                                                 <img src={freeBreakfast} alt="breakfast" />
//                                                 <p className="panDesign3">Free Breakfast</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free self parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="parking" />
//                                                 <p className="panDesign3">Free Self Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="parking" />
//                                                 <p className="panDesign3">Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="parking" />
//                                                 <p className="panDesign3">Free Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free valet parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="valet parking" />
//                                                 <p className="panDesign3">Free Valet Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "drinking water" && (
//                                             <>
//                                                 <img src={drinkingWater} alt="drinking water" />
//                                                 <p className="panDesign3">Drinking Water</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "express check-in" && (
//                                             <>
//                                                 <img src={expressCheckin} alt="express check-in" />
//                                                 <p className="panDesign3">Express Check-in</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "welcome drink" && (
//                                             <>
//                                                 <img src={welcomeDrink} alt="welcome drink" />
//                                                 <p className="panDesign3">Welcome Drink</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free fitness center access" && (
//                                             <>
//                                                 <img src={freeGym} alt="fitness center" />
//                                                 <p className="panDesign3">Free Fitness Center Access</p>
//                                             </>
//                                         )}
//                                     </div>

//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//                 <div className="priceCheck">
//                     <span style={{ fontWeight: "600", fontSize: "15px", }}>₹  {(Number(markUpamount) * Number(selectedRoom?.Price?.PublishedPriceRoundedOff) + Number(selectedRoom?.Price?.PublishedPriceRoundedOff)).toFixed(0)}</span>


//                 </div>
//             </div>
//         </div>
//     )
// }


















// {
//     selectedRoom && (

//         <div className="roomCompo" >
//             <div className="offer_area" >

//                 <div>
//                     <div className="insideOffer">

//                         <div className="inneraccorHotel">
//                             <div className="ratePlan" >
//                                 <p className="insideOfferText">{selectedRoom?.RoomTypeName}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="othInc">
//                         {selectedRoom?.IsPANMandatory && (
//                             <div className="othIncInner">
//                                 <div className="d-flex justify-content-start align-items-center gap-2">
//                                     <p className="panDesign">Pan Required</p>
//                                 </div>
//                             </div>
//                         )}
//                         {selectedRoom?.non_refundable && (
//                             <div className="othIncInner">
//                                 <div className="d-flex justify-content-start align-items-center gap-2">
//                                     <p className="panDesign2">Non Refundable</p>
//                                 </div>
//                             </div>
//                         )}
//                         {selectedRoom?.LastCancellationDate && (
//                             <div className="othIncInner">
//                                 <div className="d-flex justify-content-start align-items-center gap-2">
//                                     <p className="panDesign3">
//                                         Refundable (Cancel Before {dayjs(selectedRoom?.LastCancellationDate).format("DD MMM, YY")})
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <div className="othInc">
//                         {selectedRoom?.Amenity?.[0]?.split(',').map((inclusion, e) => {
//                             const trimmedInclusion = inclusion.trim().toLowerCase();

//                             return (
//                                 <div className="othIncInner" key={e}>
//                                     <div className="d-flex justify-content-start align-items-center gap-2">
//                                         {trimmedInclusion === "free wifi" && (
//                                             <>
//                                                 <img src={freeWifi} alt="wifi" />
//                                                 <p className="panDesign3">Free WiFi</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free internet" && (
//                                             <>
//                                                 <img src={freeWifi} alt="wifi" />
//                                                 <p className="panDesign3">Free internet</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free breakfast" && (
//                                             <>
//                                                 <img src={freeBreakfast} alt="breakfast" />
//                                                 <p className="panDesign3">Free Breakfast</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free self parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="parking" />
//                                                 <p className="panDesign3">Free Self Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="parking" />
//                                                 <p className="panDesign3">Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="parking" />
//                                                 <p className="panDesign3">Free Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free valet parking" && (
//                                             <>
//                                                 <img src={freeParking} alt="valet parking" />
//                                                 <p className="panDesign3">Free Valet Parking</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "drinking water" && (
//                                             <>
//                                                 <img src={drinkingWater} alt="drinking water" />
//                                                 <p className="panDesign3">Drinking Water</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "express check-in" && (
//                                             <>
//                                                 <img src={expressCheckin} alt="express check-in" />
//                                                 <p className="panDesign3">Express Check-in</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "welcome drink" && (
//                                             <>
//                                                 <img src={welcomeDrink} alt="welcome drink" />
//                                                 <p className="panDesign3">Welcome Drink</p>
//                                             </>
//                                         )}
//                                         {trimmedInclusion === "free fitness center access" && (
//                                             <>
//                                                 <img src={freeGym} alt="fitness center" />
//                                                 <p className="panDesign3">Free Fitness Center Access</p>
//                                             </>
//                                         )}
//                                     </div>

//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//                 <div className="priceCheck">
//                     <span style={{ fontWeight: "600", fontSize: "15px", }}>₹  {(Number(markUpamount) * Number(selectedRoom?.Price?.PublishedPriceRoundedOff) + Number(selectedRoom?.Price?.PublishedPriceRoundedOff)).toFixed(0)}</span>


//                 </div>
//             </div>
//         </div>
//     )
// }





{
    "pakageAmount": {
        "currency": "INR"
    },
    "itenerieData": [
        {
            "itenararyResult": [],
            "activities": [
                {}
            ],
            "_id": "669606cd7812298971f68b85"
        }
    ],
        "costExcludes": [],
            "compliments": [],
                "detailedItinerary": [],
                    "selectTags": [],
                        "isActive": 0,
                            "flightData": [
                                {
                                    "id": "0",
                                    "flightDetails": [
                                        {
                                            "AirlineCode": "6E",
                                            "Fare": {
                                                "PublishedFare": 7191
                                            },
                                            "IsLCC": true,
                                            "Segments": [
                                                {
                                                    "Airline": {
                                                        "AirlineCode": "6E",
                                                        "AirlineName": "Indigo",
                                                        "FareClass": "QR",
                                                        "FlightNumber": "2775"
                                                    },
                                                    "Destination": {
                                                        "Airport": {
                                                            "AirportName": "Indira Gandhi Airport",
                                                            "CityName": "Delhi",
                                                            "CountryName": "India",
                                                            "Terminal": "2"
                                                        }
                                                    },
                                                    "Origin": {
                                                        "Airport": {
                                                            "AirportName": "Chhatrapati Shivaji Maharaj International Airport",
                                                            "CityName": "Mumbai",
                                                            "CountryName": "India",
                                                            "Terminal": "2"
                                                        }
                                                    },
                                                    "Duration": 125
                                                },
                                                {
                                                    "Airline": {
                                                        "AirlineCode": "6E",
                                                        "AirlineName": "Indigo",
                                                        "FareClass": "QR",
                                                        "FlightNumber": "5058"
                                                    },
                                                    "Destination": {
                                                        "Airport": {
                                                            "AirportName": "Patna",
                                                            "CityName": "Patna",
                                                            "CountryName": "India",
                                                            "Terminal": ""
                                                        }
                                                    },
                                                    "Origin": {
                                                        "Airport": {
                                                            "AirportName": "Indira Gandhi Airport",
                                                            "CityName": "Delhi",
                                                            "CountryName": "India",
                                                            "Terminal": "3"
                                                        }
                                                    },
                                                    "Duration": 100
                                                }
                                            ],
                                            "_id": "669606cd7812298971f68b87"
                                        }
                                    ],
                                    "_id": "669606cd7812298971f68b86"
                                },
                                {
                                    "id": "1",
                                    "flightDetails": [
                                        {
                                            "AirlineCode": "YY",
                                            "Fare": {
                                                "PublishedFare": 59724
                                            },
                                            "IsLCC": false,
                                            "Segments": [
                                                {
                                                    "Airline": {
                                                        "AirlineCode": "UK",
                                                        "AirlineName": "Vistara",
                                                        "FareClass": "Q",
                                                        "FlightNumber": "957"
                                                    },
                                                    "Destination": {
                                                        "Airport": {
                                                            "AirportName": "Chhatrapati Shivaji Maharaj International Airport",
                                                            "CityName": "Mumbai",
                                                            "CountryName": "India",
                                                            "Terminal": "2"
                                                        }
                                                    },
                                                    "Origin": {
                                                        "Airport": {
                                                            "AirportName": "Indira Gandhi Airport",
                                                            "CityName": "Delhi",
                                                            "CountryName": "India",
                                                            "Terminal": "3"
                                                        }
                                                    },
                                                    "Duration": 145
                                                },
                                                {
                                                    "Airline": {
                                                        "AirlineCode": "MK",
                                                        "AirlineName": "Air Mauritius",
                                                        "FareClass": "E",
                                                        "FlightNumber": "749"
                                                    },
                                                    "Destination": {
                                                        "Airport": {
                                                            "AirportName": "Sir Seewoosagur",
                                                            "CityName": "Mauritius",
                                                            "CountryName": "Mauritius",
                                                            "Terminal": ""
                                                        }
                                                    },
                                                    "Origin": {
                                                        "Airport": {
                                                            "AirportName": "Chhatrapati Shivaji Maharaj International Airport",
                                                            "CityName": "Mumbai",
                                                            "CountryName": "India",
                                                            "Terminal": "2"
                                                        }
                                                    },
                                                    "Duration": 360
                                                }
                                            ],
                                            "_id": "669606cd7812298971f68b89"
                                        }
                                    ],
                                    "_id": "669606cd7812298971f68b88"
                                }
                            ],
                                "ItenaryPayloadData": {
        "RoomGuests": [
            {
                "NoOfAdults": 1,
                "NoOfChild": 0,
                "ChildAge": [],
                "_id": "669606cd7812298971f68b8a"
            }
        ],
            "cityAndNight": [
                {
                    "night": 2,
                    "destination": "Mauritius",
                    "_id": "669606cd7812298971f68b8b"
                },
                {
                    "night": 2,
                    "destination": "Goa",
                    "_id": "669606cd7812298971f68b8c"
                }
            ],
                "leavingFrom": "New Delhi",
                    "nationality": "India"
    },
    "priceData": {
        "grandTotal": "61516",
            "markup": 0,
                "withoutMarkup": 61516
    },
    "_id": "669606cd7812298971f68b84",
        "hotelDetails": [],
            "createdAt": "2024-07-16T05:36:13.160Z",
                "updatedAt": "2024-07-16T05:36:13.160Z",
                    "__v": 0
}