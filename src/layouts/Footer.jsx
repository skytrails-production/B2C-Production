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
import { apiURL } from "../Constants/constant";
import { load } from "@cashfreepayments/cashfree-js";
import SecureStorage from "react-secure-storage";
import axios from "axios";
const Footer = () => {
  const navigate = useNavigate();
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "production",
      // mode: "sandbox",
    });
  };
  initializeSDK();
  const handleDummyTicketBooking = () => {
    navigate("/oneWayDummyPnr");
  };

  let orderId1 = "";

  const handlePayment = async () => {
    const token = SecureStorage?.getItem("jwtToken");
    console.log(token, "token");
    const cashpayload = {
      phone: "9801540172",
      // amount: Number(finalAmount).toFixed(0),
      amount: 1,
      email: "shaanunplugged1234@gmail.com",
      productinfo: "ticket",
      bookingType: "HOTELS",
    };
    try {
      console.log("Cashfree Started");
      const response = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/api/transaction/makeCashfreePayment`,
        data: cashpayload,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      console.log("Cashfree Response", response);
      if (response.status === 200) {
        const data = response.data.result;
        console.log("Cashfree Response 1", data);
        console.log("Cashfree Session ID", data.payment_session_id);
        console.log("Cashfree Order ID", data.order_id);
        // paymentLoader(false);
        orderId1 = response.data.result.order_id;
        doPayment(response.data.result.payment_session_id);
        // proceedPayment(data.result.access, "prod", data.result.key);
        console.log("API call successful:", orderId1);
      } else {
        console.error("API call failed with status:", response.status);
        console.error("Error details:", response.data); // Use 'response.data' for error details
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("API call failed with an exception:", error);
    }
  };

  const doPayment = async (sessionID) => {
    let checkoutOptions = {
      // paymentSessionId:
      //   "session_F3qfjRlZhVXsIHEI57e2gBkYGmusQLYttDc2frS-yf-HduxICMtjm18F-5wLXlcPHBKJxudeJpZxUtcZBpZRDuKfMpG8HPmGV48uwz3jJi10mYn75eN9KplhWwpaymentpayment",
      paymentSessionId: sessionID,
      redirectTarget: "_modal",
    };
    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        console.log(
          "User has closed the popup or there is some payment error, Check for Payment Status"
        );
        sessionStorage.removeItem("couponCode");
        // toggleState(false);
        console.log(result.error);
        console.error("error occured");
      }
      if (result.redirect) {
        console.log("Payment will be redirected");
        console.log(result, "result in redirecting");
      }
      if (result.paymentDetails) {
        console.log("Payment has been completed, Check for Payment Status");
        console.log(result, "whole result in payment details");
      }
    });
  };
  return (
    <section className=" footers bg-indigo-200">
      <div className="custom-container">
        <div className="footerBoxMain">
          <div className="footerSingleBox">
            <img src={mainLogo} alt=" Logo" className="img-fluid" />

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
                  className="w-52"
                >
                  <Img src={playstoreSVG} />
                </a>
                <a
                  href="https://apps.apple.com/in/app/the-skytrails/id6475768819"
                  target="_blank"
                  className="w-52"
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
              {/* <Link to="/skytrailsblogs"> Blogs</Link> */}
              {/* <Link to="/oneWayDummyHome"> Dummy Pnr</Link> */}
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
              {/* <button
                className="bg-transparent px-3 py-1 rounded-md text-white font-semibold"
                onClick={handlePayment}
              >
                .
              </button> */}
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
