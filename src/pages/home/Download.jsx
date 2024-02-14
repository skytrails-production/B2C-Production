import scan from "../../images/scan.png";
import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./download.css";
import "../../components/card.css";
import step1 from "../../images/download/steps-1.png"
import step2 from "../../images/download/steps-2.png"
import step3 from "../../images/download/steps-3.png"
import apple from "../../images/download/apple.png"
import google from "../../images/download/google.png"
import mobil from "../../images/download/mobil.png"
import check from "../../images/download/check.png"
import axios from "axios";
import { apiURL } from "../../Constants/constant";


const Download = () => {

  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const handleDownloadLink = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${apiURL.baseURL}/skyTrails/api/user/getUrl/${mobileNumber}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.statusCode === 200) {
        setLoading(false); // Stop loading
        setSent(true); // Mark as sent
        setTimeout(() => setSent(false), 4000); // Reset "sent" state after 2 seconds
      }
      // console.log(res, "responsie")
    } catch (error) {
      console.warn("Error sending link:", error);
    }
  };


  return (

    <>
      <section class="download-gap download-no-top">
        <div class="container">
          <div class="offerText my-5">
            <p>Take Full Control of Your Booking</p>

          </div>
          <div class="row ">
            <div className="col-lg-4 col-md-4 mb-3">
              <div class="download-steps">
                <i><img src={step1} alt="steps" /></i>
                <span>1</span>
                <h4>Download from the Play Store on any device</h4>
                <p>download the app from the App Store or Google Play on any device</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 mb-3">
              <div class="download-steps">
                <i><img src={step2} alt="steps" /></i>
                <span>2</span>
                <h4>Create an account with just Phone no & Email.</h4>
                <p>download the app from the App Store or Google Play on any device</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 mb-3">
              <div class="download-steps">
                <i><img src={step3} alt="steps" /></i>
                <span>3</span>
                <h4>Explore the world with just your fingertips</h4>
                <p>download the app from the App Store or Google Play on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="download-section-mobil" style={{ backgroundImage: `url(${downloadBG})` }}> */}
      <section class="download-section-mobil mb-5" >
        <div class="opacityPackdownload"></div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="download-app">
                <h2>Download app from Play Store & App Store</h2>
                <ul class="download-list">
                  <li><img src={check} alt="check" />Flight Ticket, Bus Ticket, Hotel Booking</li>
                  <li><img src={check} alt="check" />Events, Recharge, Visa</li>
                </ul>
                <div className="qr-Box">
                  <div>
                    <img src={scan} className="scan-logo" alt="scan logo" />
                  </div>
                  <div class="d-sm-flex">
                    <a href="https://play.google.com/store/apps/details?id=com.skytrails" target="_blank"><img src={google} alt="google" /></a>
                    <a href="https://apps.apple.com/in/app/the-skytrails/id6475768819" target="_blank"><img src={apple} alt="apple" /></a>
                  </div>
                </div>
                <div className="appLink ">
                  <div class="input-group customInputGroup">
                    <div class="input-group-text designCustom">
                      +91
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value)
                      }
                      }
                      class="form-control"
                      placeholder="Mobile Number"
                    />
                    <div class="input-group-text designCustomTwo">
                      <button className="appLinkButton" onClick={handleDownloadLink} disabled={loading || sent}>
                        {loading ? (
                          <>
                            Sending...
                          </>
                        ) : sent ? (
                          <>
                            Sent <span><svg height="20" viewBox="0 0 520 520" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_5290058"><g id="_15-Checked" data-name="15-Checked"><circle cx="208.52" cy="288.5" fill="#b0ef8f" r="176.52"></circle><path d="m210.516 424.937-2.239-3.815c-34.2-58.27-125.082-181.928-126-183.17l-1.311-1.781 30.963-30.6 98.012 68.439c61.711-80.079 119.283-135.081 156.837-167.2 41.081-35.135 67.822-51.31 68.092-51.465l.608-.364h52.522l-5.017 4.468c-129.029 114.926-268.883 359.19-270.276 361.644z" fill="#009045"></path></g></svg></span>
                          </>
                        ) : (
                          "GET APP LINK"
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="download-img-mobil">
                <img src={mobil} alt="mobil" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Download;







