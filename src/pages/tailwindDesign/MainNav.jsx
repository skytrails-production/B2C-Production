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
    <div className="nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg shadow-sm">
      <div className={`MainNav2 relative z-10 ${className}`}>
        <div className="px-4 h-20 lg:container flex justify-between">
          <div
            onClick={() => navigate("/")}
            className="hidden md:flex cursor-pointer justify-start space-x-3 sm:space-x-8 lg:space-x-10 "
          >
            {/* <Logo className="w-24 self-center" /> */}
            <img
              src="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
              className="w-20 lg:w-52 md:w-44"
              alt=""
            />
          </div>

          {/* <div className="self-center lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
                        <SearchFormForMobile />
                    </div> */}

          <div className="hidden md:flex justify-center items-center flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
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
          </div>

          <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 ">
            <div className="hidden lg:flex space-x-1">
              <AvatarDropdown />
            </div>
            <div className="flex space-x-2 lg:hidden">
              <AvatarDropdown />
              {/* <MenuBar /> */}
            </div>
          </div>
        </div>
      </div>

      {/* <Authentic
        isOpen={showConfirmationModalVisible}
        onClose={closeConfirmationModal}
        isLogoutOpen={logoutModalVisible}
        onLogoutClose={closeLogoutModal}
      /> */}
    </div>
  );
};

export default MainNav;
