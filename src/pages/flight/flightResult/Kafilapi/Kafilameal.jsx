import React,{ useState, useEffect } from 'react';
// import  { useState, useEffect } from 'react';
import veg from "../../../../images/veg-01.png";
import nonveg from "../../../../images/non veg-01.png";
import { Modal as AntdModal } from 'antd';

import { Modal, Button,Tabs } from 'antd';
import "bootstrap/dist/css/bootstrap.css";
import { useLocation } from 'react-router-dom';

const { TabPane } = Tabs;

function Kafilameal({ sesstioResultIndex, mealdata,mealselect,mealfaredata }) {

  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");

  const [mellList, setMellList] = useState([]);
  const [baggageListNub, setBaggageListNub] = useState([]);
  const mealListIndivisual = [];
  const [MealListNub, setMealListNub] = useState(mealListIndivisual);
  const [baggageData, setBaggageData] = useState([]);
  const mealDataIndivisual = [];
  const [mellData, setMellData] = useState(mealDataIndivisual);
  const [baggageFare, setBaggageFare] = useState(0);
  const [mellFare, setMellFare] = useState(0);
const [selectedIndex, setSelectedIndex] = useState(0);
const [isModalVisible, setIsModalVisible] = useState(false);


 



  const showModal = () => {
    setIsModalVisible(true);
    // setMealListNub(mealListIndivisual)
    // setMellData(mealDataIndivisual)
  
    if (MealListNub.length === 0) {
      setMealListNub(mealListIndivisual);
    }
    if (mellData.length === 0) {
      setMellData(mealDataIndivisual);
    }
  };
  
  



  const mealclose = () => {
    // console.log("Selected meals:", mellData);
    setIsModalVisible(false);
  };
  
  
  
  const handleCancel = () => {
    // console.log("Selected meals:", mellData);
    setIsModalVisible(false);
  };
  
  
  // const filteredMeals = mellList?.data?.Response?.MealDynamic?.[0]?.filter(
  //   item => item.Price !== 0 && item?.AirlineDescription !== '',
  // );
  
  const filteredSegemets = sesstioResultIndex?.Itinerary?.filter((item, index) => {
    return !(
      sesstioResultIndex?.Itinerary?.[index]?.FNo ==
      sesstioResultIndex?.Itinerary?.[index + 1]?.FNo &&
      sesstioResultIndex?.Itinerary?.[index]?.FNo ==
      sesstioResultIndex?.Itinerary?.[index + 1]?.FNo
    );
  });
  

  // console.log(filteredSegemets,"filteredSegemets")
  
  const dataorgin = sesstioResultIndex?.Itinerary[0]?.SrcName;
  const destination = sesstioResultIndex?.Itinerary[sesstioResultIndex?.Itinerary.length - 1]?.DesName;
  
  let index = 0;
  const mealFlightNumberArr = [];
  
  const separatedByFlightNumber = Array.isArray(mealdata?.data?.result?.Ancl?.Meals) 
    ? mealdata?.data?.result?.Ancl?.Meals.reduce((acc, item) => {
      // console.log(item?.FNo,"FNoFNoFNoFNoFNoFNoFNo")
        if (item.Price !== 0) {
          if (!mealFlightNumberArr.includes(item.FNo)) {
            acc[index] = [];
            mealFlightNumberArr.push(item.FNo);
            index = index + 1;
          }
        
          acc[index - 1].push({ ...item, index: index - 1 });
        }
        return acc;
      }, [])
    : []; 


// console.log(separatedByFlightNumber,"separatedByFlightNumberseparatedByFlightNumberseparatedByFlightNumberseparatedByFlightNumber")


    for (let i = 0; i < filteredSegemets?.length; i++) {

      mealListIndivisual?.push(
        [...Array(separatedByFlightNumber[i]?.length)].fill(0)
      );
    // console.log("insideeMakingArray")
    mealDataIndivisual.push([]);
  }


  
  const mellFuncton = (type, bag, index, tabKey) => {
   const selectedKey=tabKey;
   if (!Array.isArray(MealListNub[selectedKey])) {
    MealListNub[selectedKey] = [];
  }

  let arr = [...MealListNub[selectedKey]];
    // console.log(MealListNub,"MealListNub");
    if (
        type == "+" &&
        mellData[selectedKey]?.length < Number(adultCount) + Number(childCount)&&
        bag.index == selectedKey
    ) {
        // console.log('insidePlus');
        let updatedMealData = [...mellData];
        updatedMealData[selectedKey] = [...mellData[selectedKey], bag];
        setMellData(updatedMealData);
        if (bag.index == selectedKey) {
          let arr = MealListNub[selectedKey];
          // console.log(arr,"arrr")
          // arr[index] = arr[index] + 1;
          arr[index] = (arr[index] || 0) + 1;
          // console.log('meal data+++', arr, MealListNub, bag, bag?.Price);
          let tempArr = [...MealListNub];
          // console.log(tempArr,"tempArr")
          tempArr[selectedKey] = arr;
          setMealListNub(tempArr);
          setMellFare(pre => pre + bag?.Price);
        
        }
    } else if (
        type == "-" &&
        mellData[selectedKey]?.length &&
       0 <  MealListNub[selectedKey][index]  && 
        bag.index == selectedKey
    ) {
        // console.log('insideMinus');
        let arr = MealListNub[selectedKey];
        if (bag.index == selectedKey) {
          arr[index] = arr[index] - 1;
          let tempArr = [...MealListNub];
          tempArr[selectedKey] = arr;
          setMealListNub(tempArr);
  
          let chd = true;
          let sub = mellData[selectedKey].filter(bagg => {
            if (bagg?.AirlineDescription === bag?.AirlineDescription && chd) {
              chd = false;
              return false;
            } else {
              return true;
            }
          });

        let updatedMealData = [...mellData];
        updatedMealData[selectedKey] = sub;
        // console.log(updatedMealData, 'updatedMealData');
        setMellData(updatedMealData);
        setMellFare((pre) => pre - bag?.Price);
    }
}
  };


// console.log(mellFare,mellData);

  // useEffect(() => {
  //   mealfaredata(mellFare); 
  //   mealselect(mellData);
  // }, [mellData, mellData]);

  console.log(mellData,"mellDatamellDatamellDatamellData");

  useEffect(() => {
    if (typeof mealfaredata === 'function') {
      mealfaredata(mellFare); 
    }
    
    if (typeof mealselect === 'function') {
      mealselect(mellData); 
    }
  }, [mellFare, mellData]);
  
  return (
   <>
    <div>

         <div className="col-lg-12 mt-3">
          <div className="bookflightPassenger "> 
           <button
               className="disablebagADDBtn"
               style={{ fontSize: "16px", cursor: "pointer", border: "none", background: "none" }}
              onClick={showModal}
             >
             <i class="fa-solid fa-cheese"></i>  Add Meal +
           </button>
        </div>

        </div>
       </div>


       <AntdModal
  title="Add Meal"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={null}
  width={800}
>
  {mealdata?.data?.result?.Error?.ErrorMessage == "" ? (
    <Tabs defaultActiveKey="0" onChange={(key) => setSelectedIndex(parseInt(key))} >
      {Object.keys(separatedByFlightNumber).map((key,innerInnex) => {
        const filteredSegment = filteredSegemets?.[innerInnex];
        const dataOrigin = sesstioResultIndex?.Itinerary[0]?.SrcName;
        const destination = sesstioResultIndex?.Itinerary[sesstioResultIndex?.Itinerary.length - 1]?.DesName;
     
         if(innerInnex==0){
          return( <TabPane tab={`(${dataorgin} - ${destination})`} key={key} style={{height:"300px",overflow:"scroll"}}>
            {separatedByFlightNumber[key]?.map((item, index) => {
             

              return (
                <div key={index} style={{ marginBottom: '16px', display: "flex", justifyContent: "space-between" }}>
                  <div className="bagListLeft">
                    
                    <div><p>{item?.SsrDesc}</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div><p>{item?.Price}</p></div>
                    <Button onClick={() => mellFuncton("-", item, index, key)}>-</Button>
                    <div>{MealListNub[parseInt(key)]?.[index] || 0}</div>
                    <Button onClick={() => mellFuncton("+", item, index, key)}>+</Button>
                  </div>
                </div>
              );
            })}
          </TabPane>)
         }
         else{
          return(
            <TabPane tab={`(${dataOrigin} - ${destination})`} key={key} style={{height:"300px",overflow:"scroll"}}>
            {separatedByFlightNumber[key]?.map((item, index) => {
              const airlineDescription = item?.AirlineDescription?.toLowerCase();
              let vegImage = null;
              let icon;
              let iconColor = "#000";

                                                                   
              return (
                <div key={index} style={{ marginBottom: '16px', display: "flex", justifyContent: "space-between" }}>
                  <div className="bagListLeft">
                    {/* <div>
                      {icon}
                      {vegImage}
                    </div> */}
                    <div><p>{item.SsrDesc}</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div><p>{item?.Price}</p></div>
                    <Button onClick={() => mellFuncton("-", item, index, key)}>-</Button>
                    <div>{MealListNub[parseInt(key)]?.[index] || 0}</div>
                    <Button onClick={() => mellFuncton("+", item, index, key)}>+</Button>
                  </div>
                </div>
              );
            })}
          </TabPane>
          )
         }
       
      })}
    </Tabs>
  ) : (
    <div>No SSR details found.</div>
  )}
  {0 < mellData?.length && (
    <div className="bagPriceCon">
      <div>
        {" "}
        {mellData[selectedIndex]?.length} of{" "}
        {Number(adultCount) + Number(childCount)} Meal(s) Selected
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
          <div style={{ fontWeight: "700" }}>₹{mellFare}</div>
        </div>
        <div
          onClick={() => mealclose(false)}
          className="buttonBag"
        >
          Done
        </div>
      </div>
    </div>
  )}
</AntdModal>
   </>
  )
}

export default Kafilameal