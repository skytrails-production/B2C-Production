import React, { useState, useEffect } from 'react';
// import { Modal as AntdModal, Button, Tabs } from 'antd';
import veg from "../../../../images/veg-01.png";
import nonveg from "../../../../images/non veg-01.png";
import { Modal, Button, Tabs } from 'antd';
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { motion } from "framer-motion";
import { Checkbox } from "antd";
import { IoPersonSharp } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { GrFormSubtract } from "react-icons/gr";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { PiSuitcaseRollingThin } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';
function Kafilabaggage({ sesstioResultIndex, mealdata ,baggagefaredata,baggageselect}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adultCount = queryParams.get("adult");
    const childCount = queryParams.get("child");
    const infantCount = queryParams.get("infant");
      const [showBaggage, setShowBaggage] = useState(false);
    const [baggageData, setBaggageData] = useState([]);
    const [baggageList, setBaggageList] = useState([]);
    const [baggageListNub, setBaggageListNub] = useState([]);
    const [baggageFare, setBaggageFare] = useState(0);
    const [baggageBool, setBaggageBool] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // console.log(sesstioResultIndex, mealdata);
 

    // Show modal function
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Close modal function
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        if (mealdata?.data?.result?.Ancl?.Baggage?.length > 0) {
         
            const initialNub = mealdata.data.result.Ancl.Baggage.map(() => 0);
            setBaggageListNub(initialNub);
        }
    }, [mealdata]);

    const bagageFuncton = (type, bag, index) => {
        if (type === "+" && baggageData?.length < Number(adultCount) + Number(childCount)) {
            setBaggageData((pre) => [...baggageData, bag]);
            let arr = [...baggageListNub];
            arr[index] = arr[index] + 1; // Increase the count at the index
            setBaggageListNub(arr);
            setBaggageFare((pre) => pre + bag?.Price);
        }
        if (type === "-" && baggageListNub[index] > 0) {
            let arr = [...baggageListNub];
            arr[index] = arr[index] - 1; // Decrease the count at the index
            setBaggageListNub(arr);
            setBaggageFare((pre) => pre - bag?.Price);

            // Remove baggage from baggageData if the count goes to zero
            let chd = true;
            let sub = baggageData.filter((bagg) => {
                if (bagg?.Weight === bag?.Weight && chd) {
                    chd = false;
                    return false;
                } else {
                    return true;
                }
            });
            setBaggageData(sub);
        }
    };

    useEffect(() => {
        baggagefaredata(baggageFare); // Send updated baggage fare to parent
        baggageselect(baggageData);
      }, [baggageFare, baggagefaredata,baggageData]);
    
      // console.log("totalPriceCalculator", totalPriceCa
// console.log(baggageData,"baggageDatabaggageDatabaggageDatabaggageDatabaggageDatabaggageData")

    return (
        <div>

            <div className="col-lg-12 mt-3">
                <div className="bookflightPassenger ">
                    <button
                        className="disablebagADDBtn"
                        style={{ fontSize: "16px", cursor: "pointer", border: "none", background: "none" }}
                        onClick={showModal}
                    >
                        <i class="fa-solid fa-cheese"></i>  Add Baagage +
                    </button>
                </div>

            </div>

            <Modal
                title="Add Baggage"
                visible={isModalVisible}
                onCancel={handleCancel}
                width={800}
                footer={null} 
            >

                <div className="overlayBg">
                    <div className="bagMnContainer">


                        <div className="baggageAireLine">
                            <div style={{ display: "flex", gap: "10px" }}>
                                {/* {baggageList?.data?.Response?.Baggage?.[0][0]?.AirlineCode ? ( */}
                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${sesstioResultIndex?.FCode}.png`}
                      alt={`filght img`}
                      style={{ height: "50px", objectFit: "contain" }}
                    />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ fontWeight: "600" }}>
                                    {sesstioResultIndex?.Itinerary[0]?.SrcName}
                      -
                      {
                                sesstioResultIndex?.Itinerary[
                                  sesstioResultIndex?.Itinerary.length - 1
                                ]?.DesName
                              }
                    </div>
                                    <div>
                      {baggageData.length} of{" "}
                      {Number(adultCount) + Number(childCount)} selected
                    </div>
                                </div>
                            </div>
                        </div>
                        <div>Included Check-in baggage per person - 15 KGS</div>
                        <div className="extraBaggageSection">
                            {mealdata?.data?.result
                                ?.Error?.ErrorMessage == "" ? (
                                mealdata?.data?.result?.Ancl?.Baggage?.map((bag, index) => {
                                    {/* console.log(bag,"bagbagbagbagbag") */}
                                            return (
                                                <div
                                                    className="bagListMap"
                                                    style={{
                                                        display: bag?.Price === 0 ? "none" : "flex",
                                                    }}
                                                >
                                                    <div className="bagListLeft">
                                                        <PiSuitcaseRollingThin size={30} />
                                                        <div className="bagAdditional">
                                                           <span> {bag?.SsrDesc}  </span>
                                                        </div>
                                                    </div>
                                                    <div className="bagListRight">
                                                        <div
                                                            className="bagListRightPrice"
                                                            style={{ fontSize: "18px", fontWeight: "400" }}
                                                        >
                                                            ₹ {bag?.Price}
                                                        </div>
                                                        <div className="qtyCounter">
                                                        <div className="qtyCounterBtn" onClick={() => bagageFuncton("-", bag, index)}>
                                                                <GrFormSubtract />
                                                            </div>
                                                            {baggageListNub[index]}{" "}
                                                            <div className="qtyCounterBtn" onClick={() => bagageFuncton("+", bag, index)}>
                                                                <IoAdd />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );


                                        }
                                    )
                            ) : (
                                <div>No SSR details found.</div>
                            )}
                        </div>
                        {0 < baggageData.length && (
                <div className="bagPriceCon">
                  <div>
                    {" "}
                    {baggageData.length} of{" "}
                    {Number(adultCount) + Number(childCount)} Baggage(s)
                    Selected
                  </div>
                  <div
                    className="bagPriceConRight"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px" }}>Added to fare</div>
                      <div style={{ fontWeight: "700" }}>₹ {baggageFare}</div>
                    </div>
                    <div
                      onClick={() => handleCancel()}
                      className="buttonBag"
                    >
                      Done
                    </div>
                  </div>
                </div>
              )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Kafilabaggage