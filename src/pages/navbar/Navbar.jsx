import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";
import PackageResSearchForm from "../NewPackagePages/PackageResSearchForm";
import AvatarDropdown from "../../components/TailwindSearchComp/mainNav/AvatarDropdown";

const Navbar = () => {
  const [show, setShow] = useState("tops");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("shows");
      } else {
        setShow("shows");
      }
    } else {
      setShow("tops");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    // <header className={`header ${show}`}>
    <header className={`nc-Header ${show} w-full headers z-30 shadow-sm`}>
      <div className={`MainNav2 relative z-10 `}>
        <div className="px-4 h-20 lg:container flex justify-between">
          <div
            onClick={() => navigate("/")}
            className="hidden md:flex cursor-pointer justify-start space-x-3 sm:space-x-8 lg:space-x-10 "
          >
            <img
              src="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
              className="w-20 lg:w-52 md:w-44"
              alt=""
            />
          </div>

          <div className="flex md:flex justify-center items-center flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
            <PackageResSearchForm />
          </div>

          <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 ">
            <div className="hidden lg:flex space-x-1">
              <AvatarDropdown />
            </div>
            <div className="flex space-x-2 lg:hidden">
              <AvatarDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
