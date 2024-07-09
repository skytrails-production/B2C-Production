import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Modal, Button, Divider } from 'antd';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ItenaryFLightFormPage from "./ItenaryFLightFormPage";
import ShowFlightDomestic from "./ShowFlightDomestic";
import { clearFlightSelectedIteneraryReducer } from "../../../Redux/Itenary/itenary";
import ShowFlightInternational from "./ShowFlightInternational";

const ItenaryFlightDashboard = () => {


    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {

        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleSelectedFlightRemove = () => {
        dispatch(clearFlightSelectedIteneraryReducer())
    }



    return (
        <div>
            <div className="dayWiseItenaryMainBox mb-3" >

                <div className="dayWiseItenaryInnerBox">
                    <div className="dayWiseItenaryContent">
                        <h5>Add Flight to my Trip : {reducerState?.Itenerary?.itenaryPayload?.leavingFrom?.Destination} {" - "} {reducerState?.Itenerary?.itenaryPayload?.cityAndNight?.[0]?.from?.Destination}</h5>
                    </div>

                    {
                        reducerState?.Itenerary?.selectedFlight.length > 0 && reducerState?.Itenerary?.selectedFlight?.[0].payloadReturn &&
                        <ShowFlightDomestic />
                    }
                    {
                        reducerState?.Itenerary?.selectedFlight.length > 0 && reducerState?.Itenerary?.selectedFlight?.[0].payloadReturnInternational &&
                        <ShowFlightInternational />
                    }

                    <div className="addActvityRoomItenary mt-4 d-flex gap-2 justify-content-end">
                        <Button width="100%" type={reducerState?.Itenerary?.selectedFlight.length > 0 ? "primary" : "dashed"} danger icon={reducerState?.Itenerary?.selectedFlight.length > 0 ? <SyncOutlined /> : <PlusOutlined />} onClick={showModal}  >
                            {reducerState?.Itenerary?.selectedFlight.length > 0 ? "Change Flight" : "Add Flight to my Trip"}
                        </Button>
                        {
                            reducerState?.Itenerary?.selectedFlight.length > 0 &&
                            <Button width="100%" type="primary" icon={<MinusCircleOutlined />} onClick={handleSelectedFlightRemove} warning >
                                Remove Flight
                            </Button>
                        }
                    </div>
                </div>
            </div>


            <Modal className="iteFliMod" width={1500} footer={null} title="Select Activity" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <div>
                    <ItenaryFLightFormPage closeModal={handleCancel} />
                </div>

            </Modal>
        </div >
    )
}

export default ItenaryFlightDashboard
