import FlightIcon from "@mui/icons-material/Flight";
import styled from "styled-components";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import STLogo from '../images/ST-Main-Logo.png';
import newlogo from '../images/newlogo.png'
import { mainheaderlogos } from "../data";
import '../layouts/navbar.css'
import LoginForm from "../components/Login";
import Navbar from "../layouts/Navbar"

const Icondivcss = styled.div`
  .icondiv {
    height: 110px;
    width: 100%;
    margin: auto;
    background-color: white;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: row;
    position: fixed;
    z-index: 99999;
    text-align: center;
    box-shadow: 1px 3px 5px #c0c0c0;
    .icons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 60%;

      p {
        padding: 0px;
        margin: -6px;
        color: #555454;
        font-size: 11px;
      }
      span {
        color: #a3a3a3;
        cursor: pointer;
      }
      span:hover {
        color: #2db0fc;
      }
      div:hover {
        color: #2db0fc;
      }
    }
  }
  .disnone {
    display: none;
  }
  .imgdiv {
    position: relative;
    top: 10px;
    left: 0px;
    img {
      width: 80%;
    }
  }
.login{
  position: relative;
  top: 10px;
  left: 40px;
}
.links{
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
    margin: 0 7%;
}
`;


export const StickyHeader = () => {
  const handlePopup = () => {
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };
  const [nav, setNav] = useState(false);
  const handleChange = () => {
    if (window.scrollY >= 100) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  window.addEventListener("scroll", handleChange);
  return (
    <Icondivcss>
      {/* style={{zIndex:'9999',display:'flex',justifyContent:'center',,height:'100px'}} */}
      <div style={{display:"flex",justifyContent:"space-between",border:"2px solid red"}}>
      {/* className="imgdiv" */}
        <div >
          <Link to="/">
            
            <img src={STLogo} alt="Logo" className="logo-back" />
              <img src={newlogo} alt="Logo" className="logo-front" />
          </Link>
        </div>
       
        {/* <ul className="links" style={{border:"1px solid pink"}}>
                        {
                            mainheaderlogos.map(({ avatar, name, path }, index) => {
                                return (
                                        <NavLink to={path} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textDecoration:'none'}}  className={({ isActive }) => isActive ? "active-nav logoname" : "logoname"}>
{/*                                        
                                            <img src={avatar} alt="mainheaderlogo" className='mainheaderlogo' style={{ width: "35px" }} />
                                       
                                           <span style={{marginTop:'7px'}}>
                                            {name}
                                            </span>  
                                        </NavLink>
                                  
                                )
                            })
                        }
                    </ul> */}
        {/* <div >
        <Login handleClick={handlePopup}/> 
         <LoginForm />
        </div> */}
      </div>
    </Icondivcss>
  );
};
