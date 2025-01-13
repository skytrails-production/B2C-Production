import React from "react";
import "../../flightResult/FlightSkeleton/FlightSleletonBigRight.scss";

const ReturnFlightSleletonBigRight = () => {
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="FlightRightSkeleton">
      {data.map((item, i) => {
        return <div className="FlightRightSkeletonItem" key={i}></div>;
      })}
    </div>
  );
};

export default ReturnFlightSleletonBigRight;
