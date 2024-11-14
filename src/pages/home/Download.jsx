import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./download.scss";
import "../../components/card.css";
import { validatePhoneNumber } from "../../../src/utility/validationFunctions";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import Img from "../../LazyLoading/Img";
import downloadBackground from "../../images/download/downloadBackground.svg";
import downloadMobile from "../../images/download/downloadMobile.png";
import { Button } from "antd";

const Download = () => {
  const [validmobileclick, setvalidmobileclick] = useState(false);
  const [validno, setvalidno] = useState(false);
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
        setLoading(false);
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      }
    } catch (error) {
      console.warn("Error sending link:", error);
    }
  };

  return (
    <>
      <section class="downloadSection mb-5 mt-5">
        <div class="container">
          <div className="backdrop-img">
            <Img src={downloadBackground} />
          </div>
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-1 order-md-2 order-sm-2 order-2">
              <div class="download-app">
                <h2>Download the app now</h2>
                <p>Get flat 500/- off on your 1st Booking</p>

                <div className="appLink">
                  <div class="input-group customInputGroup">
                    <div class="input-group-text designCustom">+91</div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (e.target.value === "") {
                          setvalidmobileclick(false);
                        }
                        setvalidno(
                          validatePhoneNumber(e.target.value) ? true : false
                        );
                      }}
                      class="form-control"
                      placeholder="Mobile Number"
                    />
                  </div>

                  {sent && (
                    <div style={{ color: "green", fontSize: "12px" }}>
                      download link sent to your whatsApp
                    </div>
                  )}
                  {validmobileclick && !validno && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      Enter valid Mobile Number
                    </div>
                  )}
                </div>
                <div className="appButton">
                  <Button
                    loading={loading}
                    className=""
                    onClick={() => {
                      loading || sent || !validno
                        ? setvalidmobileclick(true)
                        : handleDownloadLink();
                    }}
                  >
                    Get the app link
                  </Button>
                </div>
              </div>
            </div>
            <div class="col-lg-6 order-lg-2 order-md-1 order-sm-1 order-1">
              <div className="downloadImg">
                <Img src={downloadMobile} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Download;
