import React, { useState, useEffect } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import newlogo from "../../images/logoSky.svg";
import "./navbar.scss";
import ContentsWrapper from "./ContentsWrapper";
import { flightInactive, flightActive, holidayActive, holidayInactive, hotelActive, hotelInactive, busActive, busInactive, visaInactive } from "./NavbarSvgs";
import Countrypicker from "../../layouts/Countrypicker";
import { FaUser } from "react-icons/fa";
import Authentic from "../Auth/Authentic";
import { Button, Dropdown, Space } from 'antd';
import { useSelector } from "react-redux";

const Navbar = () => {
    const [show, setShow] = useState("top");
    const reducerState = useSelector((state) => state)
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const userName = reducerState?.logIn?.loginData?.data?.result?.username;
    const navigate = useNavigate();
    const location = useLocation();




    // confirmation modal open close
    const [showConfirmationModalVisible, setShowConfirmationModalVisible] = useState(false);

    const showConfirmationModal = () => {
        setShowConfirmationModalVisible(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModalVisible(false);
    };
    // confirmation modal open close


    // logout modal open close
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const showLogoutModal = () => {
        setLogoutModalVisible(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalVisible(false);
    };
    // logout modal open close

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const openMobileMenu = () => {
        setMobileMenu(true);
    };


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

        setMobileMenu(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };


    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={showLogoutModal}>
                    Logout
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    Booking History
                </a>
            ),
        },

    ];


    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentsWrapper>
                <div className="mainlogo">
                    <img src={newlogo} alt="" onClick={() => navigate('/')} />
                </div>
                {
                    !mobileMenu && (

                        <>
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
                            <div className="menuItemLogin">
                                {/* <Countrypicker /> */}

                                {
                                    userName ? (

                                        <Dropdown
                                            menu={{
                                                items,
                                            }}
                                            placement="bottomRight"
                                            arrow
                                        >
                                            <Button><FaUser />{userName}</Button>
                                            {/* <h4  ><FaUser /> {userName}</h4> */}
                                        </Dropdown>

                                    ) :
                                        (
                                            <h4 onClick={showConfirmationModal} ><FaUser /> Login/Signup</h4>

                                        )
                                }

                            </div>
                        </>



                    )
                }

                {
                    mobileMenu && (
                        <ul className="menuItems">
                            <li
                                className="menuItem"
                                onClick={() => {

                                    setMobileMenu(false)
                                    showConfirmationModal()
                                }
                                }
                            // onClick={}
                            >
                                My Account
                            </li>



                        </ul>
                    )
                }
                <div className="mobileMenuItems">
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentsWrapper>

            <Authentic
                isOpen={showConfirmationModalVisible}
                onClose={closeConfirmationModal}
                isLogoutOpen={logoutModalVisible}
                onLogoutClose={closeLogoutModal}
            />
        </header>
    );
};

export default Navbar;
