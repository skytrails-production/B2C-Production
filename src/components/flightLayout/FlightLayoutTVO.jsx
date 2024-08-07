import React, { useEffect, useState } from 'react'
import { Carousel, } from 'antd';
import planeHead from "./plane option 2.svg"
import planeTail from "./tale part 1-01 (2).svg"
import planeTail1 from "./tale part 2-01.svg"
import './FlightLayout.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { number_of_seat_map, setAirlineSeat, setDefaultSeatOccupation, setAirlineAmount, setSeatMidAmount, setSeatAmountTvo } from "../../Redux/AirlineSeatMap/actionAirlineSeatMap"
import { IoIosArrowRoundForward } from "react-icons/io";
// import {findAirportByCode } from "../../../src/utility/filghtUtility"
const rowCharacteristic = {
    E: "exit-row",
    EC: "exit-row-cabin",
    EL: "exit-left",
    ER: "exit-right",
    Z: "not-exist",
    D: "exit-door",
    EX: "emergency-exit",
    // Z: "not-exist",
    A: "extra-lag-room"


}
const SeatChar = {
    SeatType: {
        0: "", 1: "Window", 2: "Aisle", 3: "Middle", 4: "Window Recline", 5: "Window Wing", 6: "Window Exit Row", 7: "Window Recline", 8: "Window Recline Exit Row", 9: "Window Exit Row", 10: "Aisle Recline", 11: "Aisle Wing", 12: "Aisle Exit Row", 13: "Aisle Recline", 14: "Aisle Recline ExitRow", 15: "Aisle Exit Row", 16: "Middle Recline", 17: "Middle Wing", 18: "Middle Exit Row", 19: "Middle Recline", 20: "Middle Recline Exit Row", 21: "Middle Exit Row",
        22: "Window Recline Exit Row", 23: "AisleRecline Exit Row", 24: "Middle Recline Exit Row", 25: "Window Bulkhead", 26: "Window Quiet", 27: "Window Bulkhead Quiet", 28: "Middle Bulkhead", 29: "Middle Quiet", 30: "Middle Bulkhead Quiet", 31: "Aisle Bulkhead", 32: "Aisle Quiet", 33: "Aisle Bulkhead Quiet", 34: "Centre Aisle", 35: "Centre Middle", 36: "Centre Aisle Bulkhead", 37: "Centre Aisle Quiet", 38: "Centre Aisle Bulkhead Quiet", 39: "Centre Middle Bulkhead", 40: "Centre Middle Quiet", 41: "Centre Middle Bulkhead Quiet", 42: "Window Bulkhead", 43: "Window Bulkhead Exit Row", 44: "Middle Bulkhead Wing", 45: "Middle Bulkhead Exit Row", 46: "Aisle Bulkhead", 47: "Aisle Bulkhead Exit Row"
    },
    seatTypeClass: {
        0: "aisle", 1: "", 2: "", 3: "", 4: "restricted-recline", 5: "", 6: "exit-row", 7: "restricted-recline", 8: "restricted-recline exit-row", 9: "exit-row", 10: "restricted-recline", 11: "", 12: "exit-row", 13: "", 14: "exit-row restricted-recline", 15: "exit-row", 16: "restricted-recline", 17: "", 18: "exit-row", 19: "restricted-recline", 20: "restricted-recline exit-row", 21: "exit-row",
        22: "restricted-recline exit-row", 23: "restricted-recline exit-row", 24: "restricted-recline exit-row", 25: "Bulkhead", 26: "Quiet", 27: "Bulkhead Quiet", 28: "Bulkhead", 29: "Quiet", 30: "Bulkhead Quiet", 31: "Bulkhead", 32: "Quiet", 33: "Bulkhead Quiet", 34: "", 35: "", 36: "Bulkhead", 37: "Quiet", 38: "BulkheadQuiet", 39: "Bulkhead", 40: "Quiet", 41: "Bulkhead Quiet", 42: "Bulkhead", 43: "Bulkhead exit-row", 44: "Bulkhead", 45: "Bulkhead exit-row", 46: "Bulkhead", 47: "Bulkhead exit-row"
    }
    ,
    AvailablityType: {
        0: "seat-occupied", 1: "", 2: "seat-occupied", 3: "seat-occupied", 4: "aisle"

    },
    AvailablityTypeDetail: {
        0: "Notset", 1: "Open", 2: "Reserved", 3: "Blocked", 4: "No seat at this location"

    },
    Deck: {
        1: "Deck 1", 2: "Deck 2", 3: "Deck 3",

    },
    WayType: {
        0: "Segment", 1: "FullJourney"

    },
    Description: {
        1: "free",
        2: ""

    },
    SeatWayType: {
        0: "Segment", 1: "FullJourne"
    }

}
const aisleList = [2, 10, 11, 12, 13, 14, 15, 23, 31, 32, 33, 34, 36, 37, 38, 46, 47]


const Seat = ({ seat, planeNo }) => {
    const [isToolTip, setToolTip] = useState(false)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adultCount = queryParams.get("adult");
    const childCount = queryParams.get("child");
    const traveller = Number(adultCount) + Number(childCount)
    const seatList = useSelector((state) => state?.airlineSeatMap?.seatList);
    // const allSeats = Object.values(seatList).flat();

    // console.log(allSeats,"all seat list flat");
    const [SEATES, setSEATS] = useState(seatList)
    const [isChecked, setIsChecked] = useState(false)
    // const traveller = 3;
    useEffect(() => {
        setSEATS(seatList)
        if (seatList?.[planeNo]?.findIndex(Seat => Seat?.Code == seat?.Code) !== -1) {
            setIsChecked(true)

        }
        else {
            setIsChecked(false)
            // console.log(seat+rowNumber,"elseseeee")
        }
        // console.log(seatList,"seattttttttttttttttttttttttttttttttt")
    }, [seatList])


    const dispatch = useDispatch();
    const handleSeatClick = () => {

        // console.log(seatList, "sealected seat befor")
        let selectedSeat = { ...SEATES }
        // if(selectedSeat?.[planeNo]==undefined){
        //     // selectedSeat[planeNo] = []
        //     console.log( selectedSeat[planeNo]," selectedSeat[planeNo]")



        // }


        if (seat?.AvailablityType
            !== 1) {
            return false
        }
        else if (selectedSeat?.[planeNo]?.length === traveller && selectedSeat?.[planeNo]?.findIndex(Seat => Seat?.Code == (`${seat?.Code}`)) === -1) {
            // console.log(selectedSeat?.[planeNo]?.length, traveller, "selectedSeat")
            selectedSeat[planeNo].shift()

            selectedSeat[planeNo].push(seat)
            // console.log(selectedSeat, "selectedSeat1")

        }
        else {
            const index = selectedSeat?.[planeNo]?.findIndex(Seat => Seat?.Code == (`${seat?.Code}`));

            if (index !== -1) {

                selectedSeat?.[planeNo]?.splice(index, 1);


            } else {

                selectedSeat?.[planeNo]?.push(seat)

            }
            // console.log(selectedSeat, "sealected seat beforrr")
            // selectedSeat?.[planeNo]?.push(seat)
            // console.log(selectedSeat, "sealected seat beforrr")





        }
        dispatch(setAirlineSeat(selectedSeat))

        // console.log(selectedSeat, "sealected seat")

    }


    // console.log(seat, "seat")
    // console.log(airlineSeatMap, "airlineSeatMap")
    // console.log(planeNo, "planeNo")
    const handleToolTip = (check) => {

        if (check === 1) {
            setToolTip(true)
        }
        else {
            setToolTip(false)
        }
    }

    return <div onClick={() => handleSeatClick()} onMouseOver={() => handleToolTip(1)} onMouseLeave={() => handleToolTip(2)} className={`seat seat-default ${seat?.Description == 1 ? "free-seat" : ""} ${SeatChar?.AvailablityType[seat?.AvailablityType]} ${SeatChar?.seatTypeClass[seat?.SeatType]} ${isChecked ? "seatSelected" : ""}`}>
        {SeatChar?.AvailablityType[seat?.AvailablityType]}
        {isToolTip &&
            <div className='tooltip-air'>
                {SeatChar?.AvailablityType[seat?.AvailablityType] != "" ? "Sorry! This seat is taken" :
                    <>
                        <div className='tooltip-title-box'>
                            <p style={{ fontWeight: "700" }}>
                                {/* {`${res?.[0]?.seatColumn}${rowNumber}`} */}
                                {seat?.Code}
                            </p>
                            <p style={{ fontWeight: "700" }}>{SeatChar?.SeatType[seat?.SeatType]}</p>
                            <p style={{ fontWeight: "700" }}>
                                ₹ {seat?.Price || 0}
                                {seat?.Currency}
                            </p>
                        </div>
                        {/* {outputArray && <div className='tooltip-title-box'>
                                            {outputArray.map((item) => {
                                                return <p>{item}</p>
                                            })}
                                        </div>} */}


                    </>
                }
            </div>
        }
    </div>
}
const Row = ({ row, planeNo }) => {
    // console.log(row, "row")
    return (<div className="plane-row d-flex">
        {row?.Seats?.map((seat, i) => {
            let len = row?.Seats?.length;
            let isAisle = false;
            if (i < len - 1) {
                if (aisleList?.indexOf(seat?.SeatType) != -1 && aisleList?.indexOf(row?.Seats?.[i + 1]?.SeatType) != -1) {
                    isAisle = true;

                }
            }

            return <div  >
                {isAisle ? <div className='d-flex'>
                    <Seat seat={seat} key={i} planeNo={planeNo} />
                    <div className='aisle seat'></div>
                </div> :

                    <Seat seat={seat} key={i} planeNo={planeNo} />}
            </div>
        })}

    </div>)
}
const Plane = ({ data, planeNo }) => {
    const seatList = useSelector((state) => state?.airlineSeatMap?.seatList);
    const airlineSeatMap = useSelector((state) => state?.airlineSeatMap);
    const amount = useSelector((state) => state?.airlineSeatMap?.amountTVO);
    const dispatch = useDispatch();
    useEffect(() => {
        const Amount = seatList?.[planeNo]?.reduce((accumulator, seat) => {
            return accumulator + seat?.Price;

        }, 0);
        if (amount.length>=planeNo) {

            amount[planeNo] = [Amount] 
        }
        dispatch(setSeatAmountTvo(amount))


        // console.log(airlineSeatMap, Amount, amount[planeNo], "Amount")




    }, [seatList])




    return (
        <div className="plane-container">
            <div className="plane">

                <div className="plane-headd">

                    <img src={planeHead} />

                </div>


                <div className="plane-body">
                    {data?.RowSeats?.map((row, i) => {
                        return <div className="plane-row">

                            <Row planeNo={planeNo} row={row} />
                        </div>
                    })
                    }

                </div>


                <div className='palne-tail-container'>
                    {/* <div className='palin-tail-wing-top'></div> */}
                    <div className="plane-taill">
                        <img src={planeTail} alt="" />
                        {/* <img src={mmt} alt=""  /> */}
                        <img className='plane-taill-w' src={planeTail1} alt="" />
                    </div>
                    {/* <img src={tailImg} className='tail-img' alt="" /> */}
                    {/* <div className='palin-tail-wing'></div>
                        <div className='palin-tail-wing-bottom'></div>
                        <div className='palin-tail-wing-cylender'></div> */}
                </div>
            </div>

        </div>
    );
};
const FlightLayoutTVO = ({ seatMap }) => {
    const seatList = useSelector((state) => state?.airlineSeatMap?.seatList);
    const AmountList = useSelector((state) => state?.airlineSeatMap?.amountTVO);
    console.log(AmountList,"AmountList")
    const dispatch = useDispatch()
    let seatListt = []
    let seatAmountList = []
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adultCount = queryParams.get("adult");
    const childCount = queryParams.get("child");
    const traveller = Number(adultCount) + Number(childCount)
    const reducerState = useSelector((state) => state);
    const [airports, setAireport] = useState(
        reducerState?.flightList?.aireportList
    );
    function findAirportByCode(code) {

        const data = airports?.find((airport) => airport?.AirportCode === code);

        return data;
    }
    const FlightTypes = ({ planeNo }) => {
        // const Amount=useSelector((state)=>state?.airlineSeatMap?.amountList)

        // const [seatAmount,setSeatAmount]=useState([])
        // const dispatch=useDispatch()
        // let Mid
        const typeFun = (data) => {
            let type = [
                { title: "Free", color: "#50E3C2", class: "free-seat" },
                { title: "Exit Row Seats", color: "red", class: "exit-row seat-occupied" },
                { title: "Occupied", color: "red", class: "seat-occupied" },
                { title: "Restricted Recline", color: "red", class: "restricted-recline seat-occupied" },

            ];

            //       if(!data){
            //           return type
            //         }
            //         let data2=Array.from( new Set(data.map(item=>{
            //             return item.amount
            //         })))
            //         data2.sort((a, b) => b - a); 
            //         // console.log(data2)
            //         console.log(data,data2,"dataaaaaaaaaaaaaaaaaa")



            //   if(data2?.length===1){
            //       type.push({ title: `₹ ${data2?.[0]}`
            //    , color: "red", class: "seat-price-low"})
            //    Mid=data2?.[0]+1
            //   }
            //   else if(data2?.length===2){
            //         type.push({ title: `₹ ${data2?.[0]}`
            //    , color: "red", class: "seat-price-high"})
            //     type.push({ title: `₹ ${data2?.[1]}`
            //    , color: "red", class: "seat-price-low"})
            //    Mid=data2?.[0]

            //   }
            //   else if(data2?.length===3){
            //         type.push({ title: `₹ ${data2?.[0]}`
            //    , color: "red", class: "seat-price-highhhh"})
            //     type.push({ title: `₹ ${data2?.[1]}-${data2?.[2]}`
            //    , color: "red", class: "seat-price-low"})
            //    Mid=data2?.[0]
            //   }
            //   else if(3<data2?.length){
            //   let mid=(data2?.length/2).toFixed()
            //   let maxHigh=data2[0]
            //   let minHigh=data2[mid-1]
            //   let maxLow=data2[mid]
            //   let minLow=data2[data2?.length-1]
            //        type.push({ title: `₹ ${minHigh}-${maxHigh}`
            //    , color: "red", class: "seat-price-high"})
            //     type.push({ title: `₹ ${minLow}-${maxLow}`
            //    , color: "red", class: "seat-price-low"})
            //   console.log(maxHigh,minHigh,maxLow,minLow)
            //   Mid=minHigh
            //   }

            return type

        }
        const Type = typeFun()
        // useEffect(()=>{
        //     dispatch(setSeatMidAmount(Mid))
        // },[])



        return (
            <div className='plane-type-container' onMouseOver={(e) => e.stopPropagation()}>

                {Type && Type.map((item) => {
                    return (
                        <div className='plane-type-item'>
                            <div className={`seat ${item.class}`}></div>
                            <div className="plane-type-item-title">{item.title}</div>
                        </div>
                    );
                })}

            </div>
        );
    };
    useEffect(() => {
        seatListt = []

        for (let i = 0; i < seatMap?.[0]?.SegmentSeat?.length; i++) {
            // seatListt[i]={}
            seatListt.push([])
            seatAmountList.push([])
            // console.log(seatListt, "gg")
        }

        dispatch(setAirlineSeat(seatListt))
        dispatch(setSeatAmountTvo(seatAmountList))
    }, [seatMap])

    return (
        <>

            {
                seatMap ?

                    <Carousel draggable={true} arrows arrowSize={60} infinite={false}>
                        {
                            seatMap?.[0]?.SegmentSeat?.map((d, i) => {
                                // console.log(d, "ddddddddddd")

                                return (
                                    <div className="FLightSeatMapBox">
                                        <div style={{}} key={i} >
                                            <div className='seat-navbar-container'>
                                                <div className='seat-navbar'>


                                                    <div>

                                                        <div className='seat-navbar-left-1'>
                                                            <p>{findAirportByCode(
                                                                d?.RowSeats?.[0]?.Seats?.[0]?.
                                                                    Origin)?.name}
                                                            </p>
                                                            < IoIosArrowRoundForward />
                                                            <p>{findAirportByCode(
                                                                d?.RowSeats?.[0]?.Seats?.[0]?.
                                                                    Destination)?.name}
                                                            </p>
                                                        </div>
                                                        <div className='seat-navbar-left-2'>
                                                            <p >{seatList?.[i]?.length} of {traveller} Seat(s) Selected</p>
                                                        </div>
                                                    </div>
                                                    <div>{
                                                        seatList?.[i]?.length === 0 ?
                                                            <p>Selection pending</p> :
                                                            <div>
                                                                <p className='navbar-right-price'>{`₹ ${AmountList?.[i]}`}</p>
                                                                <p>Added to fare</p>
                                                            </div>
                                                    }
                                                    </div>
                                                </div>
                                                <div className='plane-type'><FlightTypes /></div>
                                            </div>


                                            <Plane data={d} planeNo={i} />

                                        </div>
                                    </div>
                                )
                            })}

                    </Carousel> :
                    <p>hiiiii</p>
            }
        </>
    )
}

export default FlightLayoutTVO
