import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { BsFacebook, BsInstagram, BsEnvelope, BsTwitter } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import appstoreSVG from "../images/download/appstoreSVG.svg";
import playstoreSVG from "../images/download/playstoreSVG.svg";
import mainLogo from "../images/newlogo.png";
import "./footer.scss";
import Img from "../LazyLoading/Img";

const Footer = () => {
  const navigate = useNavigate();

  const handleDummyTicketBooking = () => {
    navigate("/oneWayDummyPnr");
  };
  return (
    // <section className="footer">
    //   <div className="container p-0">
    //     <div className="row w-100">
    //       <div className="mobileViewFooterLogo col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
    //         <img
    //           src={mainLogo}
    //           width={300}
    //           alt="Flowbite Logo"
    //           className="img-fluid"
    //         />
    //       </div>
    //       <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
    //         <div className="row gap-6 mt-4 mt-sm-0">
    //           <div className="col-md-6 col-sm-6 col-xs-4 col-6">
    //             <h5>About</h5>
    //             <ul className="list-unstyled mt-3">
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="aboutus">About Skytrails</Link>
    //               </li>
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="contactus">Contact Us</Link>
    //               </li>

    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="/oneWayDummyHome"> Dummy Pnr</Link>
    //               </li>
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="/skytrailsblogs"> Blogs</Link>
    //               </li>
    //             </ul>
    //           </div>

    //           <div className="col-md-6 col-sm-6 col-xs-4 col-6">
    //             <h5>Legal</h5>
    //             <ul className="list-unstyled mt-3">
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="privacypolicy">Privacy Policy</Link>
    //               </li>
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="/packagepayment">Package Payment</Link>
    //               </li>
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="termAndCondition">Term &amp; Co</Link>
    //               </li>
    //               <li>
    //                 <KeyboardDoubleArrowRightIcon />
    //                 <Link to="refundPolicy">Refund Policy</Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="row">
    //       <div className="addressFooter   ">
    //         <p className="mb-2">Address :</p>
    //         <span>
    //           BB-11, 1st floor, Greater Kailash 2 Enclave, Masjid Moth, Greater
    //           Kailash, New Delhi, DELHI, Delhi 110048
    //         </span>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="row w-100 justify-content-between">
    //       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center text-sm-start mt-4 mt-sm-0">
    //         <a href="#" className="text-decoration-none">
    //           2024 SkyTrials Pvt. Ltd. &copy; All Rights Reserved
    //         </a>
    //       </div>
    //       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center text-sm-end mt-4 mt-sm-0">
    //         <div className="footerIconBox">
    //           <a
    //             href="https://www.facebook.com/theskytrailsofficials?locale=hi_IN"
    //             target="_blank"
    //             className="text-decoration-none me-2"
    //           >
    //             <BsFacebook />
    //           </a>
    //           <a
    //             href="https://www.instagram.com/theskytrails?fbclid=IwAR0NNIPbCVGWTggTEM-OnH1Wsf1ALOZE1B3EIHyy5G0SeTp5xAWSPrfGK8Y"
    //             target="_blank"
    //             className="text-decoration-none me-2"
    //           >
    //             <BsInstagram />
    //           </a>
    //           <a
    //             href="https://twitter.com/TheSkytrails"
    //             target="_blank"
    //             className="text-decoration-none me-2"
    //           >
    //             <BsTwitter />
    //           </a>
    //           <a
    //             href="mailto: info@theskytrails.com"
    //             target="_blank"
    //             className="text-decoration-none me-2"
    //           >
    //             <BsEnvelope />
    //           </a>
    //           <a
    //             href="https://www.linkedin.com/company/theskytrailsofficial?originalSubdomain=in"
    //             target="_blank"
    //             className="text-decoration-none me-2"
    //           >
    //             <FaLinkedin />
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className=" footers">
      <div className="custom-container">
        <div className="footerBoxMain">
          <div className="footerSingleBox">
            <img src={mainLogo} alt="Flowbite Logo" className="img-fluid" />

            <div className="footerSingleBoxContent followBox">
              <h4>Follow us</h4>
              <div className="iconBoxFooter">
                <a
                  href="https://www.facebook.com/theskytrailsofficials?locale=hi_IN"
                  target="_blank"
                  className="text-decoration-none me-2"
                >
                  <BsFacebook />
                </a>
                <a
                  href="https://www.instagram.com/theskytrails?fbclid=IwAR0NNIPbCVGWTggTEM-OnH1Wsf1ALOZE1B3EIHyy5G0SeTp5xAWSPrfGK8Y"
                  target="_blank"
                  className="text-decoration-none me-2"
                >
                  <BsInstagram />
                </a>
                <a
                  href="https://twitter.com/TheSkytrails"
                  target="_blank"
                  className="text-decoration-none me-2"
                >
                  <BsTwitter />
                </a>
                <a
                  href="mailto: info@theskytrails.com"
                  target="_blank"
                  className="text-decoration-none me-2"
                >
                  <BsEnvelope />
                </a>
                <a
                  href="https://www.linkedin.com/company/theskytrailsofficial?originalSubdomain=in"
                  target="_blank"
                  className="text-decoration-none me-2"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="footerSingleBox">
            <div className="footerSingleBoxContent">
              <h4>Download the Skytrails App</h4>
              <div className="DownLLoad">
                <a
                  href="https://play.google.com/store/apps/details?id=com.skytrails&hl=en_IN"
                  target="_blank"
                >
                  <Img src={playstoreSVG} />
                </a>
                <a
                  href="https://apps.apple.com/in/app/the-skytrails/id6475768819"
                  target="_blank"
                >
                  <Img src={appstoreSVG} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="footerBoxMainTwo">
          <div className="footerSingleBox">
            <div className="footerSingleBoxContentLinks">
              <h4>About us</h4>
              <Link to="aboutus">About Skytrails</Link>
              <Link to="/skytrailsblogs"> Blogs</Link>
              <Link to="/oneWayDummyHome"> Dummy Pnr</Link>
              <Link to="/career"> Career</Link>
            </div>
          </div>
          <div className="footerSingleBox">
            <div className="footerSingleBoxContentLinks">
              <h4>Policies</h4>
              <Link to="privacypolicy">Privacy Policy</Link>
              <Link to="termAndCondition">Term &amp; Co</Link>
            </div>
          </div>
          <div className="footerSingleBox">
            <div className="footerSingleBoxContentLinks">
              <h4>Help and Support</h4>
              <Link to="contactus">Contact Us</Link>
              <Link to="refundPolicy">Refund Policy</Link>
              <Link to="/packagepayment">Package Payment</Link>
            </div>
          </div>
          <div className="footerSingleBox">
            <div className="footerSingleBoxContentLinks">
              <h4>Reach out to us</h4>
              <Link to="tel:+919209793097">+91-9209793097</Link>
              <Link to="mailto:holidays@theskytrails.com">
                holidays@theskytrails.com
              </Link>
            </div>
          </div>
        </div>
        <hr />

        <div className="footerBoxMain">
          <div className="footerSingleBox">
            <div className="footerSingleBoxContentLinks">
              <Link to="#">
                © Skytrails Private Limited. All Rights Reserved.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
