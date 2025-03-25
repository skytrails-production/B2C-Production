import React from "react";
import "../../flightResult/FlightSkeleton/FlightSleletonBigRight.scss";

const ReturnFlightSleletonBigRight = () => {
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="FlightRightSkeleton">
      {data.map((item, i) => {
        // return <div className="FlightRightSkeletonItem" key={i}></div>;
        return (
          <div className=" border-muted rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4  pt-0">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Airline info skeleton */}
                <div className="col-span-12 sm:col-span-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full animate-pulse  bg-muted" />
                  <div>
                    <div className="h-5 w-28 mb-1 animate-pulse rounded-md bg-muted" />
                    <div className="h-3 w-16 animate-pulse rounded-md bg-muted" />
                  </div>
                </div>

                {/* Flight details skeleton */}
                <div className="col-span-12 sm:col-span-5 flex items-center justify-between">
                  <div className="text-center">
                    <div className="h-6 w-16 mb-1 mx-auto animate-pulse rounded-md bg-muted" />
                    <div className="h-4 w-10 mx-auto animate-pulse rounded-md bg-muted" />
                  </div>

                  <div className="flex flex-col items-center mx-2">
                    <div className="h-3 w-16 mb-1 animate-pulse rounded-md bg-muted" />
                    <div className="h-2 w-28 my-2 animate-pulse rounded-md bg-muted" />
                    <div className="h-3 w-14 animate-pulse rounded-md bg-muted" />
                  </div>

                  <div className="text-center">
                    <div className="h-6 w-16 mb-1 mx-auto animate-pulse rounded-md bg-muted" />
                    <div className="h-4 w-10 mx-auto animate-pulse rounded-md bg-muted" />
                  </div>
                </div>

                {/* Price and select skeleton */}
                <div className="col-span-12 sm:col-span-4 flex items-center justify-between sm:justify-end gap-4">
                  <div className="h-8 w-24 rounded-full animate-pulse  bg-muted" />
                  <div className="text-right">
                    <div className="h-7 w-20 mb-1 ml-auto animate-pulse rounded-md bg-muted" />
                    <div className="h-9 w-24 ml-auto animate-pulse rounded-md bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReturnFlightSleletonBigRight;
