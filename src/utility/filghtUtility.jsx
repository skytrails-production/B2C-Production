// import { useState } from "react";
// import { useSelector } from "react-redux";

// export function findAirportByCode(code) {
//   const reducerState = useSelector((state) => state);
//   const [airports, setAireport] = useState(
//     reducerState?.flightList?.aireportList
//   );
//     const data = airports?.find((airport) => airport?.AirportCode === code);
    
//     return data;
//   }
//   export function findAirlineByCode(code) {
//     const reducerState = useSelector((state) => state);
//     const [airlines, setAirlines] = useState(
//       reducerState?.flightList?.flightDetails
//     );
//     const data = airlines?.find((airline) => airline?.airlineCode === code);

//     return data?.airlineName;
//   }
