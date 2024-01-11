import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Typograph,
  useMediaQuery,
  useTheme,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import tra from "../images/tra.png";
import DrawerComp from "./DrawerComp";
import Countrypicker from "./Countrypicker";

import { Link, NavLink } from "react-router-dom";
import STLogo from "../images/ST-Main-Logo.png";
import newlogo from "../images/newlogo.png";
import "./navbar.css";
// import bgimg from "../images/bg.png";

const PAGES = ["Home", "About Us", "Contact Us", "Products"];
const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          backgroundImage: "url('../images/app.png')",  // Add the path to your background image
          backgroundSize: 'cover',  // Adjust the background size as needed
          backgroundRepeat: 'no-repeat',
          paddingLeft: '20px'
        }}
      >
        <div>
          <Link to="/">
            <img src={STLogo} alt="Logo" className="logo-back" />
            <img src={newlogo} alt="Logo" className="logo-front" />
          </Link>
        </div>

        <div className="seconddiv">
          <Countrypicker />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
