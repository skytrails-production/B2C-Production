import { Link, NavLink } from "react-router-dom";

// bootstarp css link
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import STLogo from "../images/"
import STLogo from "../images/ST-Main-Logo.png";
import newlogo from "../images/newlogo.png";
import { mainheaderlogos } from "../data";
import "./mainheader1.css";
const Mainheader = () => {
  return (
    <section className="mainheader_wrapper">
      <div className="container mainheader_container">
        <div
          className="row mainheader_row1"
          style={{ position: "relative", zIndex: "2" }}
        >
          <div style={{ width: "200px" }}>
            <Link to="/">
              <img src={newlogo} alt="Logo" className="logo-front" />
            </Link>
          </div>

          <ul className="mainhome_logos">
            {mainheaderlogos.map(({ avatar, name, path }, index) => {
              return (
                <>
                  <NavLink
                    to={path}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                    className={({ isActive }) =>
                      isActive ? "active-nav logoname" : "logoname"
                    }
                  >
                    <img
                      src={avatar}
                      alt="mainheaderlogo"
                      className="mainheaderlogo"
                      style={{ width: "35px" }}
                    />

                    <span
                      style={{ marginTop: "7px", fontFamily: "Montserrat" }}
                    >
                      {name}
                    </span>
                  </NavLink>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Mainheader;
