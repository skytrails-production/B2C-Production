import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./itenary.css"
import { Modal, Input, Select, ConfigProvider, Button } from 'antd';
import { CloudUploadOutlined, EditOutlined } from '@ant-design/icons';

const IteneraryPriceSummary = () => {

    const reducerState = useSelector((state) => state);
    const [modalVisible, setModalVisible] = useState(false);
    const [adjustmentType, setAdjustmentType] = useState('percentage');
    const [adjustmentValue, setAdjustmentValue] = useState('');
    const [grandTotalPrice, setGrandTotalPrice] = useState(0);
    const [isMarkupApplied, setIsMarkupApplied] = useState(false);


    const markUpHotel =
        reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;
    const hotelTotal = Number(Number(markUpHotel) * Number(reducerState?.Itenerary?.selectedHotel?.Price?.PublishedPriceRoundedOff)) + Number(reducerState?.Itenerary?.selectedHotel?.Price?.PublishedPriceRoundedOff)

    const markUpFlight =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;


    const hotelData = reducerState?.Itenerary;

    let adults = 0;
    let children = 0;
    // let infants = 0;

    hotelData?.itenaryPayload?.RoomGuests?.forEach((data) => {
        adults += data.NoOfAdults;
        children += data.NoOfChild;
    });


    const adultsFlight = sessionStorage.getItem("adults");
    const childrenFlight = sessionStorage.getItem("childs");
    const infants = sessionStorage.getItem("infants");


    const hotelFinalPrice = hotelData?.itenaryPayload?.RoomGuests?.length && hotelTotal
        ? Number(hotelData.itenaryPayload.RoomGuests.length * hotelTotal)
        : 0;

    const flightDomesticSelected = hotelData?.selectedFlight && hotelData?.selectedFlight?.[0]?.payloadReturn;
    const returnDomesticFinalPrice = flightDomesticSelected
        ? Number(
            (hotelData.selectedFlight?.[0]?.payloadGoing?.Fare?.PublishedFare +
                hotelData.selectedFlight?.[0]?.payloadReturn?.Fare?.PublishedFare) +
            markUpFlight *
            (hotelData.selectedFlight?.[0]?.payloadGoing?.Fare?.PublishedFare +
                hotelData.selectedFlight?.[0]?.payloadReturn?.Fare?.PublishedFare)
        )
        : 0;



    // flight international 

    const flightInternationalSelected = hotelData?.selectedFlight && hotelData?.selectedFlight?.[0]?.payloadReturnInternational;
    const returnInternationalFinalPrice = flightInternationalSelected
        ? Number(
            hotelData?.selectedFlight?.[0]?.payloadReturnInternational?.Fare?.PublishedFare +
            (Number(markUpFlight) *
                Number(hotelData?.selectedFlight?.[0]?.payloadReturnInternational?.Fare?.PublishedFare))
        )
        : 0;

    // flight international 



    // Calculate total activities price and day-wise total
    let totalActivitiesPrice = 0;
    const selectedActivities = reducerState?.Itenerary?.selectedActivities;

    // Check if activities are selected
    const hasActivities = selectedActivities && Object.keys(selectedActivities).length > 0;

    // Object to store day-wise total
    const dayWiseTotal = {};

    // Calculate total price for each day
    if (hasActivities) {
        Object.keys(selectedActivities).forEach((day) => {
            dayWiseTotal[day] = selectedActivities[day].reduce((acc, activity) => {
                return acc + activity.price;
            }, 0);
            totalActivitiesPrice += dayWiseTotal[day]; // Accumulate total activities price
        });
    }













    // saving as proposal logic here

    useEffect(() => {
        const initialGrandTotal = Number(hotelFinalPrice) + Number(returnDomesticFinalPrice) + Number(returnInternationalFinalPrice) + Number(totalActivitiesPrice);
        setGrandTotalPrice(initialGrandTotal.toFixed(0));
        setIsMarkupApplied(false);
    }, [hotelFinalPrice, returnDomesticFinalPrice, returnInternationalFinalPrice, totalActivitiesPrice]);

    // Function to calculate adjusted price
    const calculateAdjustedPrice = () => {
        let adjustedPrice = Number(hotelFinalPrice) + Number(returnDomesticFinalPrice) + Number(returnInternationalFinalPrice) + Number(totalActivitiesPrice);

        if (adjustmentType === 'percentage') {
            adjustedPrice *= (1 + Number(adjustmentValue) / 100);
        } else if (adjustmentType === 'flat') {
            adjustedPrice = Number(adjustedPrice) + Number(adjustmentValue);
        }

        setGrandTotalPrice(adjustedPrice.toFixed(0));
        setIsMarkupApplied(true);
    };

    // Modal functions
    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleOk = () => {
        calculateAdjustedPrice();
        setModalVisible(false);
    };


    // saving as proposal logic here 


    return (
        <div className='w-100 price-summary-container'>


            <div className="hotelItenarySummary">
                <div className=''>
                    <h6 style={{ fontSize: "15px", fontWeight: "600", textAlign: "center", padding: "8px" }}>Hotel Price Breakdown</h6>
                </div>
                <div>
                    <p style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }} className='mb-2'>{`${hotelData?.itenaryPayload?.RoomGuests?.length} Rooms, ${adults} adults  ${children.length > 0 ? `, ${children.length} child${children.length > 1 ? 'ren' : ''}` : ''}`}</p>
                    <div className='d-flex justify-content-between align-items-center '>
                        <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Price per Room</h6>
                        <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {(hotelTotal).toFixed(0)}</h6>
                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Total Price</h6>
                        <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {(hotelData?.itenaryPayload?.RoomGuests?.length * hotelTotal).toFixed(0)}</h6>
                    </div>
                </div>
            </div>

            {/* domestic return flight  */}

            {
                hotelData?.selectedFlight?.[0]?.payloadReturn &&
                <div className="hotelItenarySummary">
                    <div className=''>

                        <h6 style={{ fontSize: "15px", fontWeight: "600", textAlign: "center", padding: "8px" }}>Flight Price Breakdown</h6>
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }} className='mb-2'>{` ${adultsFlight} adults  ${childrenFlight > 0 ? `, ${childrenFlight} child${childrenFlight > 1 ? 'ren' : ''}` : ''} ${infants > 0 ? `, ${infants} Infant` : ''}  `}</p>

                        <>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Base Price</h6>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {
                                    Number(hotelData?.selectedFlight?.[0]?.payloadGoing?.Fare?.PublishedFare) +
                                    Number(hotelData?.selectedFlight?.[0]?.payloadReturn?.Fare?.PublishedFare)



                                }</h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Total Tax</h6>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {
                                    Number(markUpFlight * (hotelData?.selectedFlight?.[0]?.payloadGoing?.Fare?.PublishedFare + hotelData?.selectedFlight?.[0]?.payloadReturn.Fare?.PublishedFare)).toFixed(0)


                                }</h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Total Price</h6>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {
                                    Number((hotelData?.selectedFlight?.[0]?.payloadGoing?.Fare?.PublishedFare + hotelData?.selectedFlight?.[0]?.payloadReturn?.Fare?.PublishedFare) + markUpFlight * (hotelData?.selectedFlight?.[0]?.payloadGoing?.Fare?.PublishedFare + hotelData?.selectedFlight?.[0]?.payloadReturn.Fare?.PublishedFare)).toFixed(0)
                                }</h6>
                            </div>
                        </>
                    </div>
                </div>

            }


            {/* domestic return flight  */}


            {/* international return flight  */}

            {
                hotelData?.selectedFlight?.[0]?.payloadReturnInternational &&
                <div className="hotelItenarySummary">
                    <div className=''>

                        <h6 style={{ fontSize: "15px", fontWeight: "600", textAlign: "center", padding: "8px" }}>Flight Price Breakdown</h6>
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }} className='mb-2'>{` ${adultsFlight} adults  ${childrenFlight > 0 ? `, ${childrenFlight} child${childrenFlight > 1 ? 'ren' : ''}` : ''} ${infants > 0 ? `, ${infants} Infant` : ''}  `}</p>

                        <>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Base Price</h6>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {
                                    Number(hotelData?.selectedFlight?.[0]?.payloadReturnInternational?.Fare?.PublishedFare)
                                }</h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Total Tax</h6>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {
                                    Number(markUpFlight * (hotelData?.selectedFlight?.[0]?.payloadReturnInternational?.Fare?.PublishedFare)).toFixed(0)


                                }</h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>Total Price</h6>
                                <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {
                                    Number((hotelData?.selectedFlight?.[0]?.payloadReturnInternational?.Fare?.PublishedFare) + (markUpFlight * (hotelData?.selectedFlight?.[0]?.payloadReturnInternational?.Fare?.PublishedFare))).toFixed(0)
                                }</h6>
                            </div>
                        </>
                    </div>
                </div>

            }


            {/* international return flight  */}

            {hasActivities && (
                <div className="hotelItenarySummary">
                    <div className=''>
                        <h6 style={{ fontSize: "15px", fontWeight: "600", textAlign: "center", padding: "8px" }}>Activities Price Breakdown</h6>
                    </div>
                    <div>
                        {Object.keys(selectedActivities).map((day, index) => (
                            // Check if there are activities for the current day
                            selectedActivities[day].length > 0 && (
                                <div className='d-flex justify-content-between align-items-center' key={index}>
                                    <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>{`Day ${parseInt(day) + 1} Activities Price:`}</h6>
                                    <h6 style={{ fontSize: "13px", fontWeight: "500", textAlign: "left" }}>₹ {dayWiseTotal[day].toFixed(0)}</h6>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}


            <div className='d-flex justify-content-between align-items-center mt-3'>
                <h6 style={{ fontSize: "16px", fontWeight: "600", textAlign: "left" }}>Total Price</h6>

                {/* <h6 style={{ fontSize: "18px", fontWeight: "600", textAlign: "left" }}>₹ {(Number(hotelFinalPrice) + Number(returnDomesticFinalPrice) + Number(returnInternationalFinalPrice) + Number(totalActivitiesPrice)).toFixed(0)}</h6> */}
                <h6 style={{ fontSize: "18px", fontWeight: "600", textAlign: "left" }}>₹ {grandTotalPrice}</h6>

            </div>

            <div className="d-flex w-100 gap-2 mt-3">
                {isMarkupApplied ? (
                    <ConfigProvider
                        theme={{
                            token: {
                                // Seed Token
                                colorPrimary: '#333',
                                borderRadius: 4,

                                // Alias Token
                                colorBgContainer: '#f6ffed',
                            },
                        }}
                    >

                        <Button
                            // icon={<EditOutlined />}
                            // onClick={() => setModalVisible(true)}
                            style={{ width: "100%" }}
                            type="primary"
                        >
                            Continue
                        </Button>
                    </ConfigProvider>)
                    :
                    (<ConfigProvider
                        theme={{
                            token: {
                                // Seed Token
                                colorPrimary: '#333',
                                borderRadius: 4,

                                // Alias Token
                                colorBgContainer: '#f6ffed',
                            },
                        }}
                    >
                        <Button style={{ width: "100%" }} onClick={showModal} type="primary" icon={<CloudUploadOutlined />} primary>Save as Proposal</Button>
                    </ConfigProvider>

                    )}
                {isMarkupApplied && (
                    <ConfigProvider
                        theme={{
                            token: {
                                // Seed Token
                                colorPrimary: '#333',
                                borderRadius: 4,

                                // Alias Token
                                colorBgContainer: '#f6ffed',
                            },
                        }}
                    >

                        <Button
                            icon={<EditOutlined />}
                            onClick={() => setModalVisible(true)}
                            style={{ width: "100%" }}
                            type="primary"
                        >
                            Edit Markup
                        </Button>
                    </ConfigProvider>
                )}
            </div>




            <Modal
                title="Add Markup"
                open={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Save
                    </Button>,
                ]}
            >
                <div className='d-flex flex-row w-100 gap-2 py-4'>

                    <Input
                        type="number"
                        placeholder="Enter adjustment value"
                        value={adjustmentValue}
                        onChange={(e) => setAdjustmentValue(e.target.value)}
                    />
                    <Select defaultValue="percentage" onChange={setAdjustmentType}>
                        <Select.Option value="percentage">Percentage</Select.Option>
                        <Select.Option value="flat">Flat Price</Select.Option>
                    </Select>
                </div>

            </Modal>
        </div>
    )
}

export default IteneraryPriceSummary
