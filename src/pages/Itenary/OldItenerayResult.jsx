import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { Modal, Button, Divider } from 'antd';
import dayjs from "dayjs";
import ItenaryHotel from "./ItenaryHotel";
import { useNavigate } from "react-router-dom";
import ItenaryFlightDashboard from "./ItenaryFlight/ItenaryFlightDashboard";
import { apiURL } from "../../Constants/constant";
import axios from "axios";
import { handleActivityRequest, setFLightFromRequest, setFLightToRequest } from "../../Redux/Itenary/itenary";
import ItenaryResultSkeleton from "./ItenaryResultSkeleton";
import IteneraryPriceSummary from "./IteneraryPriceSummary";


const ItenaryResult = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    const itenaryResult = reducerState?.Itenerary?.itenararyResult?.[0]?.data?.result;
    const activities = reducerState?.Itenerary?.itenararyResult?.[0]?.data?.result?.[0]?.activities;
    const initialDate = reducerState?.Itenerary?.itenaryPayload?.leavingDate;
    const [loader, setLoader] = useState(true)


    // console.log(selectedActivities, "selectedActivities")



    useEffect(() => {
        const hotelResults = reducerState?.Itenerary?.hotelResultArray;
        const allResultsReceived = hotelResults.length === reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.length;

        if (allResultsReceived) {
            const errorExists = hotelResults.some(result => result?.data?.data?.HotelSearchResult?.Error?.ErrorCode !== 0);
            if (!errorExists) {
                setLoader(false);
            } else {
                setLoader(false);
            }
        }
    }, [reducerState?.Itenerary?.hotelResultArray, reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.length]);

    // console.log(loader, "loader")
    const showModal = (dayIndex) => {
        setSelectedDayIndex(dayIndex);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelectActivity = (activity) => {
        setSelectedActivities(prevState => {
            const newActivities = { ...prevState };
            if (!newActivities[selectedDayIndex]) {
                newActivities[selectedDayIndex] = [];
            }
            const activityExists = newActivities[selectedDayIndex].some(act => act._id === activity._id);
            if (!activityExists) {
                newActivities[selectedDayIndex].push(activity);
            }
            return newActivities;
        });

        handleOk();
    };

    useEffect(() => {
        dispatch(handleActivityRequest(selectedActivities))
    }, [selectedActivities])

    const handleRemoveActivity = (dayIndex, activityIndex) => {
        setSelectedActivities(prevState => {
            const newActivities = { ...prevState };
            newActivities[dayIndex].splice(activityIndex, 1);
            return newActivities;
        });
    };

    const getDateForDay = (startDate, dayIndex) => {
        return dayjs(startDate).add(dayIndex, 'days').format('ddd, D MMM, YYYY');
    };

    const dayWiseDetails = itenaryResult?.[0]?.dayAt?.map((item, index) => {
        const currentDate = getDateForDay(initialDate, index);
        return {
            ...item,
            date: currentDate,
            selectedActivities: selectedActivities[index] || []
        };
    });

    console.log(reducerState, "reducer state in the itenerary result page")

    useEffect(() => {
        const flightFromData = () => {
            axios
                .get(`${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${reducerState?.Itenerary?.itenaryPayload?.leavingFrom?.Destination}`)
                .then((response) => {
                    // setFlightFromData(response?.data)
                    dispatch(setFLightFromRequest(response?.data))
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        // if (flightFromData == null) {

        flightFromData();
        // }

    }, [])


    useEffect(() => {
        const flightToData = () => {

            axios
                .get(`${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[0]?.from?.Destination}`)
                .then((response) => {

                    // setFlightToData(response?.data)
                    dispatch(setFLightToRequest(response?.data))
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        // if (flightToData == null) {
        flightToData();

        // }

    }, [])



    return (
        <>
            {
                loader ?
                    (
                        <ItenaryResultSkeleton />
                    )
                    :

                    (
                        <div className="container-fluid p-4" >
                            <div className="row " >
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <ItenaryFlightDashboard />
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="headingItenary">
                                                <h6>Stays in {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[0]?.from?.Destination} {" "} {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[0]?.night} {" "} Nights </h6>
                                            </div>

                                            <ItenaryHotel />
                                            {/* day wise details */}
                                            {dayWiseDetails?.map((item, index) => {
                                                return (
                                                    <div className="dayWiseItenaryMainBox mb-3" key={index}>
                                                        <div className="headingItenary">
                                                            <h6 className="mb-3">Day {index + 1}: {item.date}</h6>
                                                        </div>
                                                        <div className="dayWiseItenaryInnerBox">
                                                            <div className="dayWiseItenaryContent">
                                                                <h5>{item?.title}</h5>
                                                                <div className='paragraph-Itenary'>
                                                                    <p className="paragraphinsideItenary">
                                                                        {item?.description}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {item.selectedActivities.map((activity, activityIndex) => (
                                                                <div key={activityIndex}>
                                                                    <Divider />
                                                                    <h6>{activity.title.slice(0, 60)}</h6>
                                                                    <div className="d-flex w-100 justify-content-between gap-5 align-items-center">
                                                                        <p>{activity.description.slice(0, 100)}</p>

                                                                        <div className="d-flex flex-column justify-content-center gap-2 mb-0 align-items-center">
                                                                            <h6 style={{ color: "green", fontWeight: "600" }}>₹ {activity?.price}</h6>
                                                                            <Button type="dashed" icon={<MinusCircleOutlined />} onClick={() => handleRemoveActivity(index, activityIndex)}>Remove</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            <div className="addActvityRoomItenary mt-4 d-flex justify-content-end">
                                                                <Button type="primary" icon={<PlusOutlined />} danger onClick={() => showModal(index)}>
                                                                    Add Activity
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            <Modal width={800} title="Select Activity" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                                {activities?.map((activity, activityIndex) => (
                                                    <div key={activityIndex}>
                                                        <h6>{activity.title.slice(0, 60)}</h6>
                                                        <div className="d-flex  w-100 justify-content-between gap-5 align-items-center">
                                                            <p>{activity.description.slice(0, 150)}</p>
                                                            <div className="d-flex flex-column justify-content-center gap-2 mb-0 align-items-center">
                                                                <h6 style={{ color: "green", fontWeight: "600" }}>₹ {activity?.price}</h6>
                                                                <Button type="dashed" icon={<PlusOutlined />} onClick={() => handleSelectActivity(activity)} warning>Add</Button>
                                                            </div>
                                                        </div>
                                                        <Divider />
                                                    </div>
                                                ))}
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <IteneraryPriceSummary />
                                </div>
                            </div>

                        </div>
                    )
            }
        </>
    )
}

export default ItenaryResult;


