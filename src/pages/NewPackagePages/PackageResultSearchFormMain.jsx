import React from "react";
import PackageResSearchForm from "./PackageResSearchForm";

const PackageResultSearchFormMain = ({ cityData }) => {
  return (
    <>
      {cityData?.imageUrl ? (
        <div
          style={{
            backgroundImage: cityData?.imageUrl
              ? `url(${cityData.imageUrl})`
              : "none",
          }}
          className="flightMainBox relative py-16 bg-purple-200 bg-[radial-gradient(circle,_rgba(70,81,229,1)_0%,_rgba(101,102,214,1)_100%)] hidden md:flex flex-col justify-center bg-cover bg-center bg-no-repeat"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

          <div className="relative z-10">
            {cityData?.cityName && (
              <h2 className="text-center font-bold text-white pb-8">
                {`${cityData?.cityName
                  ?.charAt(0)
                  .toUpperCase()}${cityData?.cityName
                  .slice(1)
                  .toLowerCase()} Holiday Packages`}
              </h2>
            )}
            <PackageResSearchForm />
          </div>
        </div>
      ) : (
        <div className="flightMainBox relative py-12 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 hidden md:flex flex-col justify-center bg-cover bg-center bg-no-repeat">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

          <div className="relative z-10">
            {cityData?.cityName && (
              <h2 className="text-center font-bold text-white pb-8">
                {`${cityData?.cityName
                  ?.charAt(0)
                  .toUpperCase()}${cityData?.cityName
                  .slice(1)
                  .toLowerCase()} Holiday Packages`}
              </h2>
            )}
            <PackageResSearchForm />
          </div>
        </div>
      )}
    </>
  );
};

export default PackageResultSearchFormMain;
