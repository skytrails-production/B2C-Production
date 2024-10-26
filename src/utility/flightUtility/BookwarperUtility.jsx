import { useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
// export const useSeatUtility = () => {
//   const airlineSeatMap = useSelector((state) => state?.airlineSeatMap);

//   // const airlineSeatMap = [
//   //   [
//   //     {
//   //       seat: "F16",
//   //       amount: 1059,
//   //       currency: "INR",
//   //     },
//   //     {
//   //       seat: "F7",
//   //       amount: 1323,
//   //       currency: "INR",
//   //     },
//   //   ],
//   //   [
//   //     {
//   //       seat: "F7",
//   //       amount: 0,
//   //     },
//   //     {
//   //       seat: "F14",
//   //       amount: 0,
//   //     },
//   //   ],
//   // ];
//   // let seatGroup = `<seatGroup>
//   //       <seatRequest>
//   //         <special>
//   //           <data>${"10B"}</data>
//   //         </special>
//   //       </seatRequest>
//   //     </seatGroup>`;
//   // let dataElementsIndiv = `
//   //   <dataElementsIndiv>
//   //     <elementManagementData>
//   //       <segmentName>STR</segmentName>
//   //     </elementManagementData>
//   //     ${seatGroup}
//   //     <referenceForDataElement>
//   //       <reference>
//   //         <qualifier>PR</qualifier>
//   //         <number>1</number>
//   //       </reference>
//   //       <reference>
//   //         <qualifier>ST</qualifier>
//   //         <number>1</number>
//   //       </reference>
//   //     </referenceForDataElement>
//   //   </dataElementsIndiv>`;
//   console.log(airlineSeatMap, "airlineSeatMap");
//   let dataElementsIndiv = "";
//   if (Array.isArray(airlineSeatMap?.seatList)) {
//     airlineSeatMap?.seatList.forEach((flight, index) => {
//       let seatGroup = "";
//       flight.forEach((seat) => {
//         console.log(seat, "flight");
//         //         seatGroup += `
//         // <seatRequest>
//         // <special>
//         // <data>${seat.seat}</data>
//         // </special>
//         // </seatRequest>
//         // `;
//         seatGroup += `

// <data>${seat?.seat}</data>

// `;
//       });
//       dataElementsIndiv += `
//     <dataElementsIndiv>
//       <elementManagementData>
//         <segmentName>STR</segmentName>
//       </elementManagementData>
//       <seatGroup>
//       <seatRequest>
//  <special>
//       ${seatGroup}
//       </special>
// </seatRequest>

//       </seatGroup>
//       <referenceForDataElement>
//         <reference>
//           <qualifier>PR</qualifier>
//           <number>1</number>
//         </reference>
//         <reference>
//           <qualifier>ST</qualifier>
//           <number>${index + 1}</number>
//         </reference>
//       </referenceForDataElement>
//     </dataElementsIndiv>`;
//     });
//   }
//   // console.log(dataElementsIndiv, "reducer stateddddd");
//   return dataElementsIndiv;
// };

export const useSeatUtility = () => {
  const airlineSeatMap = useSelector((state) => state?.airlineSeatMap);

  let dataElementsIndiv = "";
  let seatIndex = 1; // To ensure unique seat references

  if (Array.isArray(airlineSeatMap?.seatList)) {
    airlineSeatMap?.seatList.forEach((flight, passengerIndex) => {
      let seatGroup = "";

      flight.forEach((seat) => {
        console.log(seat, "flight");

        seatGroup += `
          <seatRequest>
            <special>
              <data>${seat?.seat}</data>
            </special>
          </seatRequest>
        `;

        // Ensure seatIndex is unique for each seat
        seatIndex++;
      });

      dataElementsIndiv += `
        <dataElementsIndiv>
          <elementManagementData>
            <segmentName>STR</segmentName>
          </elementManagementData>
          <seatGroup>
            ${seatGroup}
          </seatGroup>
          <referenceForDataElement>
            <reference>
              <qualifier>PR</qualifier>
              <number>${passengerIndex + 1}</number> 
            </reference>
            <reference>
              <qualifier>ST</qualifier>
              <number>${seatIndex}</number> 
            </reference>
          </referenceForDataElement>
        </dataElementsIndiv>`;
    });
  }

  console.log(
    dataElementsIndiv,
    "Generated seat request for multiple passengers"
  );
  return dataElementsIndiv;
};

export function findAirlineByCode(code) {
  // const reducerState = useSelector((state) => state);
  // Get the current state from the Redux store

  const state = store.getState();

  // Access the airport list from the state
  const airlinetList = state?.flightList?.flightDetails;

  // Perform the lookup
  if (!Array.isArray(airlinetList) || !code) return null;
  return airlinetList.find((airport) => airport?.airlineCode === code);
}
// console.log(airports,airlines);
export function findAirportByCode(code) {
  // const reducerState = useSelector((state) => state);
  // const [airports, setAireport] = useState(
  //   reducerState?.flightList?.aireportList
  // );
  // const
  const state = store.getState();
  const airportList = state?.flightList?.aireportList;
  const data = airportList?.find((airport) => airport?.AirportCode === code);
  // console.log(state?.flightList, "airportlist");
  return data;
}
