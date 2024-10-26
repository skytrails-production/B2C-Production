import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

const LazyImage = ({ src, alt, title, backgroundColor }) => {
  return (
    <LazyLoad
      height={50}
      width={50}
      offset={100}
      placeholder={
        <div
          className="rounded-full object-cover w-[50px] h-[50px] flex items-center justify-center text-white font-semibold uppercase"
          style={{ backgroundColor: backgroundColor || "red" }}
        >
          <p>{title}</p>
        </div>
      }
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover w-[50px] h-[50px]"
        />
      ) : (
        <div
          className="rounded-full object-cover w-[50px] h-[50px] flex items-center justify-center text-white font-semibold uppercase"
          style={{ backgroundColor: backgroundColor || "red" }}
        >
          <p>{title}</p>
        </div>
      )}
    </LazyLoad>
  );
};
// import { PiAirplaneInFlight } from "react-icons/pi";
// import { LiaHotelSolid } from "react-icons/lia";
// import { IoBusOutline } from "react-icons/io5";
// import { FaUmbrellaBeach } from "react-icons/fa";
const CardOne = ({ className = "", data }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (destination) {
      const id = destination?._id;
      navigate(`/holidaypackages/packagedetails/${id}`);
    }
  }, [destination]);

  const searchOneHoliday = (item) => {
    // console.log(item, "item")
    const id = item?._id;
    setDestination(item);
    const payloadDestination = {
      destination: destination?.country,
      days: 0,
    };
    sessionStorage.setItem(
      "searchPackageData",
      JSON.stringify(payloadDestination)
    );
  };

  return (
    <div
      onClick={(e) => searchOneHoliday(data)}
      className={`nc-CardCategory3 flex flex-col ${className}`}
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-64 rounded-2xl overflow-hidden group`}
      >
        <img
          src={data?.pakage_img || data?.package_img?.[0]}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2
          className={`text-sm sm:text-sm text-neutral-900  font-medium truncate`}
        >
          {data?.pakage_title}
        </h2>
        <span
          className={`flex justify-between mt-1.5 text-base text-neutral-600 `}
        >
          <span>
            {data?.days}D/ {data?.days - 1}N
          </span>
          <span>₹ {data?.pakage_amount?.amount}</span>
        </span>
      </div>
    </div>
  );
};
const CardOne1 = ({ item, icon, index }) => {
  // console.log(item, icon, "itemmmm");
  const generateRandomColor = () => {
    let color;
    let brightness; // Define brightness here
    do {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      // Calculate brightness using the luminance formula
      brightness = (r * 299 + g * 587 + b * 114) / 1000;
      color = `rgb(${r}, ${g}, ${b})`;
    } while (brightness < 150); // Keep generating if color is too dark
    return color;
  };

  const backgroundColor = generateRandomColor();
  let rating = item?.rate;

  let images = [
    "https://raw.githubusercontent.com/The-SkyTrails/Images/refs/heads/main/icons/flightIcon.png",
    "https://raw.githubusercontent.com/The-SkyTrails/Images/refs/heads/main/icons/beachIcon.png",
    "https://raw.githubusercontent.com/The-SkyTrails/Images/refs/heads/main/icons/passportIcon.png",
    "https://raw.githubusercontent.com/The-SkyTrails/Images/refs/heads/main/icons/airplaneIcon.png",
  ];
  return (
    <div class="swiper-slide group bg-white border border-solid h-auto border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full hover:border-indigo-600 slide-active:border-indigo-600 min-w-[300px]">
      <div class="flex items-center mb-2 gap-2 text-amber-500 transition-all duration-500  group-hover:text-indigo-600 swiper-slide-active:text-indigo-600 h-auto">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 transition-all duration-500 ${
              index < rating
                ? "text-indigo-600 "
                : "group-hover:text-gray-300 text-gray-300"
            }`}
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>
      <div className="h-[105px] overflow-scroll">
        <p class="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 mb-9 group-hover:text-gray-800  whitespace-break-spaces">
          {item?.comments}
        </p>
      </div>
      <div class="flex items-center gap-2">
        {item?.userId?.profilePic ? (
          <LazyImage
            src={item?.userId?.profilePic}
            // src={images?.[index]}
            alt=""
            title={item?.userName?.[0]}
            backgroundColor={backgroundColor}
          />
        ) : (
          // <img
          //   class="rounded-full object-cover w-[50px] h-[50px]"
          //   src={item?.userId?.profilePic}
          //   alt="avatar"
          // />
          <div
            className="rounded-full object-cover w-[50px] h-[50px] bg-red-400 flex items-center justify-center text-white font-semibold uppercase"
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            <p>{item?.userName?.[0]}</p>
          </div>
        )}

        <div class="grid gap-1 items-center">
          <h5 class="text-gray-900 font-medium transition-all duration-500  group-hover:text-indigo-600 swiper-slide-active:text-indigo-600 m-0">
            {item?.userName}
          </h5>
          <span class="text-sm leading-6 text-gray-500 flex gap-1 items-center">
            {icon}
            {item.destination}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardOne1;
