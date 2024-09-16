import { useSelector } from "react-redux";

export const useSeatUtility = () => {
  const airlineSeatMap = useSelector((state) => state?.airlineSeatMap);
  // const airlineSeatMap = [
  //   [
  //     {
  //       seat: "F16",
  //       amount: 1059,
  //       currency: "INR",
  //     },
  //     {
  //       seat: "F7",
  //       amount: 1323,
  //       currency: "INR",
  //     },
  //   ],
  //   [
  //     {
  //       seat: "F7",
  //       amount: 0,
  //     },
  //     {
  //       seat: "F14",
  //       amount: 0,
  //     },
  //   ],
  // ];
  // let seatGroup = `<seatGroup>
  //       <seatRequest>
  //         <special>
  //           <data>${"10B"}</data>
  //         </special>
  //       </seatRequest>
  //     </seatGroup>`;
  // let dataElementsIndiv = `
  //   <dataElementsIndiv>
  //     <elementManagementData>
  //       <segmentName>STR</segmentName>
  //     </elementManagementData>
  //     ${seatGroup}
  //     <referenceForDataElement>
  //       <reference>
  //         <qualifier>PR</qualifier>
  //         <number>1</number>
  //       </reference>
  //       <reference>
  //         <qualifier>ST</qualifier>
  //         <number>1</number>
  //       </reference>
  //     </referenceForDataElement>
  //   </dataElementsIndiv>`;
  console.log(airlineSeatMap, "airlineSeatMap");
  let dataElementsIndiv = "";
  airlineSeatMap?.seatList.forEach((flight, index) => {
    let seatGroup = "";
    flight.forEach((seat) => {
      console.log(seat, "flight");
      seatGroup += `
        <seatRequest>
          <special>
            <data>${seat.seat}</data>
          </special>`;
    });
    dataElementsIndiv += `
    <dataElementsIndiv>
      <elementManagementData>
        <segmentName>STR</segmentName>
      </elementManagementData>
      ${seatGroup}
      <referenceForDataElement>
        <reference>
          <qualifier>PR</qualifier>
          <number>1</number>
        </reference>
        <reference>
          <qualifier>ST</qualifier>
          <number>${index + 1}</number>
        </reference>
      </referenceForDataElement>
    </dataElementsIndiv>`;
  });
  console.log(dataElementsIndiv, "reducer stateddddd");
  return airlineSeatMap;
};
