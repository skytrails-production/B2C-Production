import React from "react";

const ReturnFlightSleletonBig = () => {
  const skItemLeftFilterBig = () => {
    return (
      <div className="skeletonItemResultFilter">
        <div className="posterBlock skeleton"></div>
        {/* <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div> */}
      </div>
    );
  };
  return (
    <div className="sticky top-4 rounded-lg border bg-card text-card-foreground ">
      <div className="pb-3 flex flex-col space-y-2 p-6">
        <div className="h-6 w-32 animate-pulse rounded-lg bg-muted" />
      </div>

      <div className="space-y-6 p-6 pt-0">
        {/* Price Range Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
          <div className="px-2 space-y-2">
            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
            <div className="flex justify-between">
              <div className="h-4 w-12 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-muted" />

        {/* Stops Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-md animate-pulse bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-muted" />

        {/* Times Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-md animate-pulse bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-muted" />

        {/* Airlines Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-md animate-pulse bg-muted" />
                <div className="h-4 w-36 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-muted" />

        {/* Amenities Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-md animate-pulse bg-muted" />
                <div className="h-4 w-40 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnFlightSleletonBig;
