import React from 'react'
import "./bottomnavbar.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { flightInactive, flightActive, holidayActive, holidayInactive, hotelActive, hotelInactive, busActive, busInactive, visaInactive } from "./NavbarMobileSvgs";

const BottomNavbar = () => {

    const navigate = useNavigate();
    const location = useLocation();


    const navigationHandler = (type) => {
        if (type === "flight") {
            navigate("/");
        }
        if (type === 'holidays') {
            navigate("/holidaypackages");
        }
        if (type === 'hotel') {
            navigate("/st-hotel");
        }
        if (type === 'bus') {
            navigate("/bus");
        }

        // setMobileMenu(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <div className='bottomNavbarMain'>
            <ul className="menuItems">
                <li
                    className={`menuItem ${isActive("/") ? "active" : ""}`}
                    onClick={() => navigationHandler("flight")}
                >
                    {isActive("/") ? flightActive : flightInactive} Flight
                </li>
                <li
                    className={`menuItem ${isActive("/st-hotel") ? "active" : ""}`}
                    onClick={() => navigationHandler("hotel")}
                >
                    {isActive("/st-hotel") ? hotelActive : hotelInactive} Hotels
                </li>
                <li
                    className={`menuItem ${isActive("/holidaypackages") ? "active" : ""}`}
                    onClick={() => navigationHandler("holidays")}
                >
                    {isActive("/holidaypackages") ? holidayActive : holidayInactive} Holidays
                </li>
                <li
                    className={`menuItem ${isActive("/bus") ? "active" : ""}`}
                    onClick={() => navigationHandler("bus")}
                >
                    {isActive("/bus") ? busActive : busInactive} Buses
                </li>
                <li className="menuItem">
                    {visaInactive}
                    <Link to={"https://visa.theskytrails.com"} target="_blank">
                        Visa
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default BottomNavbar
