import { Link, NavLink } from 'react-router-dom';

// bootstarp css link
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import { mainheaderlogos } from "../data";
import './mainheader.css'
const Mainheader = () => {
    return (
        <section className="mainheader_wrapper" >
            <div className="container mainheader_container">
                <div className="row mainheader_row" style={{ position: "relative", zIndex: "2" }} >
                    <ul className="mainhome_logos">
                        {
                            mainheaderlogos.slice(0, 4).map(({ avatar, name, path }, index) => {
                                return (


                                    <>
                                        <NavLink to={path} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: "black", fontWeight: "600" }} className={({ isActive }) => isActive ? "active-nav logoname" : "logoname"}>

                                            <img src={avatar} alt="mainheaderlogo" className='mainheaderlogo' style={{ width: "35px" }} />

                                            <span style={{ marginTop: '7px', fontFamily: 'Montserrat' }}>
                                                {name}
                                            </span>
                                        </NavLink>

                                    </>

                                )
                            })
                        }
                        <a href="https://visa.theskytrails.com/" target='_blank' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: "black", fontWeight: "600" }} className={({ isActive }) => isActive ? "active-nav logoname" : "logoname"}>
                            <img src={mainheaderlogos[4]?.avatar} alt="mainheaderlogo" className='mainheaderlogo' style={{ width: "35px" }} />

                            <span style={{ marginTop: '7px', fontFamily: 'Montserrat' }}>
                                {mainheaderlogos[4]?.name}
                            </span>
                        </a>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Mainheader;