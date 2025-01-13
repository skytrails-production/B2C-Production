import React from "react";
import SearchFormForMobile from "../../components/TailwindSearchComp/mainNav/SearchFormForMobile";
import AvatarDropdown from "../../components/TailwindSearchComp/mainNav/AvatarDropdown";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  flightInactive,
  flightActive,
  holidayActive,
  holidayInactive,
  hotelActive,
  hotelInactive,
  busActive,
  busInactive,
  visaInactive,
} from "../navbar/NavbarSvgs";
import { BedDouble, BusFront, Plane, TentTree } from "lucide-react";
// import { FaIdCard } from "react-icons/fa";

const MainNav = ({ className = "" }) => {
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    const currentPath = location.pathname;

    if (path === "/") {
      return (
        currentPath === "/" ||
        currentPath === "/Searchresult" ||
        currentPath === "/Searchresult/booknow"
      );
    }

    return currentPath.startsWith(path);
  };

  const navigationHandler = (type) => {
    if (type === "flight") {
      navigate("/");
    }
    if (type === "holidays") {
      navigate("/holidaypackages");
    }
    if (type === "hotel") {
      navigate("/st-hotel");
    }
    if (type === "bus") {
      navigate("/bus");
    }
  };

  return (
    <div className="nc-Header overflow-visible sticky top-0 w-full left-0 right-0 z-40 nc-header-bg shadow-sm">
      <div className={`MainNav2 relative z-10 ${className}`}>
        <div className="px-4 h-20 lg:container flex justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex flex-grow md:flex-grow-0 md:flex cursor-pointer justify-start space-x-3 sm:space-x-8 lg:space-x-10 "
          >
            <img
              src="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
              className="w-36 md:w-44 xl:w-52 "
              alt=""
            />
          </div>

          <div className="hidden md:flex justify-center items-center flex-1 space-x-5 sm:space-x-8 lg:space-x-10">
            <ul className="mb-0 p-0 gap-3 flex overflow-x-auto hiddenScrollbar">
              <li
                className={`flex-shrink-0 flex gap-1 py-1 ps-2 sm:pe-2  xl:pe-3 rounded-full items-center cursor-pointer text-[12px] lg:text-[13px] xl:text-lg font-medium ${
                  isActive("/") ? "bg-indigo-200 " : " bg-gray-100"
                }`}
                onClick={() => navigationHandler("flight")}
              >
                {/* {isActive("/") ? flightActive : flightInactive} */}
                <div className="w-6 h-6 xl:w-8 xl:h-8 shadow-md  flex items-center justify-center rounded-full p-1 xl:p-2 bg-white">
                  <Plane
                    size={18}
                    className={`${
                      isActive("/") ? "text-primary-6000" : "text-black"
                    }`}
                  />
                </div>
                Flight
              </li>
              <li
                className={`flex-shrink-0 flex gap-1 py-1 ps-2 sm:pe-2  xl:pe-3 rounded-full items-center cursor-pointer text-[12px] lg:text-[13px] xl:text-lg font-medium ${
                  isActive("/st-hotel") ? "bg-indigo-200 " : " bg-gray-100"
                }`}
                onClick={() => navigationHandler("hotel")}
              >
                {/* {isActive("/st-hotel") ? hotelActive : hotelInactive} */}
                <div className="w-8 h-8 flex shadow-md items-center justify-center rounded-full p-2 bg-white">
                  <BedDouble
                    size={18}
                    className={`${
                      isActive("/st-hotel") ? "text-primary-6000" : "text-black"
                    }`}
                  />
                </div>
                Hotels
              </li>
              <li
                className={`flex-shrink-0 flex gap-1 py-1 ps-2 sm:pe-2  xl:pe-3 rounded-full items-center cursor-pointer text-[12px] lg:text-[13px] xl:text-lg font-medium ${
                  isActive("/holidaypackages")
                    ? "bg-indigo-200 "
                    : " bg-gray-100"
                }`}
                onClick={() => navigationHandler("holidays")}
              >
                {/* {isActive("/holidaypackages") ? holidayActive : holidayInactive}{" "} */}
                <div className="w-8 h-8  shadow-md  flex items-center justify-center rounded-full p-2 bg-white">
                  <TentTree
                    className={`${
                      isActive("/holidaypackages")
                        ? "text-primary-6000"
                        : "text-black"
                    }`}
                    size={18}
                  />
                </div>
                Holidays
              </li>
              <li
                className={`flex-shrink-0 flex gap-1 py-1 ps-2 sm:pe-2  xl:pe-3 rounded-full items-center cursor-pointer text-[12px] lg:text-[13px] xl:text-lg font-medium ${
                  isActive("/bus") ? "bg-indigo-200 " : " bg-gray-100"
                }`}
                onClick={() => navigationHandler("bus")}
              >
                {/* {isActive("/bus") ? busActive : busInactive}  */}
                <div className="w-8 h-8 shadow-md  flex items-center justify-center rounded-full p-2 bg-white">
                  <BusFront
                    size={18}
                    className={`${
                      isActive("/bus") ? "text-primary-6000" : "text-black"
                    }`}
                  />
                </div>
                Buses
              </li>
              <li className="flex-shrink-0 flex gap-1 py-1 ps-2 sm:pe-2  xl:pe-3 rounded-full items-center cursor-pointer text-[12px] lg:text-[13px] xl:text-lg font-medium bg-gray-100">
                {/* {visaInactive} */}
                <div className="w-8 h-8 shadow-md  flex items-center justify-center rounded-full p-2 bg-white">
                  {/* <IdCard size={18} /> */}
                  <i class="fa-regular fa-address-card text-sm"></i>
                </div>
                <Link
                  to={"https://visa.theskytrails.com"}
                  className=" no-underline text-gray-800"
                  target="_blank"
                >
                  Visa
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="hidden md:flex justify-center items-center flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
            <ul className="mb-0 p-0 gap-2 flex overflow-x-auto hiddenScrollbar">
              <li
                className={`flex-shrink-0 flex gap-1 p-1 rounded-lg items-center cursor-pointer text-sm lg:text-lg font-medium ${
                  isActive("/") ? "active " : ""
                }`}
                onClick={() => navigationHandler("flight")}
              >
                {isActive("/") ? flightActive : flightInactive} Flight
              </li>
              <li
                className={`flex-shrink-0 flex gap-1 p-1 rounded-lg items-center cursor-pointer text-sm lg:text-lg font-medium ${
                  isActive("/st-hotel") ? "active " : ""
                }`}
                onClick={() => navigationHandler("hotel")}
              >
                {isActive("/st-hotel") ? hotelActive : hotelInactive} Hotels
              </li>
              <li
                className={`flex-shrink-0 flex gap-1 p-1 rounded-lg items-center cursor-pointer text-sm lg:text-lg font-medium ${
                  isActive("/holidaypackages") ? "active " : ""
                }`}
                onClick={() => navigationHandler("holidays")}
              >
                {isActive("/holidaypackages") ? holidayActive : holidayInactive}{" "}
                Holidays
              </li>
              <li
                className={`flex-shrink-0 flex gap-1 p-1 rounded-lg items-center cursor-pointer text-sm lg:text-lg font-medium ${
                  isActive("/bus") ? "active " : ""
                }`}
                onClick={() => navigationHandler("bus")}
              >
                {isActive("/bus") ? busActive : busInactive} Buses
              </li>
              <li className="flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-lg font-medium">
                {visaInactive}
                <Link
                  to={"https://visa.theskytrails.com"}
                  className=" no-underline text-gray-800"
                  target="_blank"
                >
                  Visa
                </Link>
              </li>
            </ul>
          </div> */}

          <div className="flex md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 ">
            <div className="hidden lg:flex space-x-1">
              <AvatarDropdown />
            </div>
            <div className="flex space-x-2 lg:hidden">
              <AvatarDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
