import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../Constants/constant";
import { usePDF } from "react-to-pdf";
import "./busEticket.css";
import InsideNavbar from "../UI/BigNavbar/InsideNavbar";
import { BiSupport } from "react-icons/bi";
const pdfLogo = "https://travvolt.s3.amazonaws.com/ST-Main-LogoPdf.png";
const Spinner = () => {
  return (
    <div className="spinner">
      <InsideNavbar />
    </div>
  );
};

const BusETicket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toPDF, targetRef } = usePDF({ filename: "busEticket.pdf" });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            `${apiURL.baseURL}/skyTrails/bus/bookings/${id}`

        );
        // const response = await axios.get(
        //   `${apiURL.baseURL}/skyTrails/bus/bookings/65c0a3b4a32a71b8a11c33b3`
        // );
        if (response?.data) {
          setData(response?.data);
          // console.log("Data fetched:", response.data);
        } else {
          console.error("No data received.");
        }
      } catch (error) {
        console.error("Error fetching flight booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Display loading spinner or message while fetching data
  if (loading) {
    return <Spinner />;
  }

  // Check if data exists and has elements before accessing its properties
  if (!data) {
    // console.log(data, !Array.isArray(data?.result), data.result)
    return (
      <div>
        <InsideNavbar />
        No data available.
      </div>
    );
  }

  const currentDate = new Date(data?.result?.createdAt);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // dateFormate

  function formatDate(dateString, format) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }

  const boardingTimeFormatted = formatDate(
    data?.result?.departureTime,
    "DD MMMM YYYY hh:mm A"
  );
  const journeyDateFormatted = formatDate(
    data?.result?.departureTime,
    "ddd, DD MMM YYYY"
  );
  const depTimeFormatted = formatDate(data?.result?.departureTime, "hh:mm A");

  return (
    <>
      <InsideNavbar />
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ marginTop: "100px", padding: "0px 15px", width: "100%" }}>
          <button className="downloadpdfbtn" onClick={() => toPDF()}>
            Download as Pdf
          </button>
          <div id="pdf-content">
            <div ref={targetRef}
            style={{
                background: "#fff",
                overflow: "hidden",
                padding: "10px",
                maxWidth: "800px",
                border: "1px solid #D6D8E7",
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                margin: "10px auto"
                , overflowX: 'scroll'
            }}
            >
              <div
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display: "flex",
                  marginTop: "24px",
                }}
              >
                <img
                  src={pdfLogo}
                  alt="logo"
                  style={{ width: "25%", marginTop: "-10px" }}
                />
                <div
                  style={{
                    color: "black",
                    fontSize: "24px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  E - Ticket
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#868686",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      Booking Id:
                    </div>
                    <div
                      style={{
                        color: "#071c2c",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.result && data?.result?.pnr}
                    </div>
                  </div>

                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#868686",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      PNR:
                    </div>
                    <div
                      style={{
                        color: "#071c2c",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.result && data?.result?.pnr}
                    </div>
                  </div>

                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#868686",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        wordWrap: "break-word",
                      }}
                    >
                      (Booked on {formattedDate})
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}

              <div style={{ marginTop: "15px", width: "100%" }}>
                <b>Ticket Reservation</b> Please take a print of this ticket. A
                copy of the ticket has to be produced at the time of boarding.
                Please be present atleast 15 mins prior to time of departure at
                the boarding point
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  border: "1px solid #D6D8E7",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    background: "#004684",
                    fontWeight: "bold",
                    padding: "5px",
                    paddingRight: "0",
                    color: "#fff",
                    overflow: "hidden",
                  }}
                >
                  <p style={{ width: "40%", margin: "0 4px 0 0" }}>
                    Passenger Name
                  </p>
                  <p
                    style={{
                      width: "20%",
                      textAlign: "center",
                      margin: "0 4px 0 0",
                    }}
                  >
                    Ticket Number
                  </p>
                  <p
                    style={{
                      width: "20%",
                      textAlign: "center",
                      margin: "0 4px 0 0",
                    }}
                  >
                    Seat Number
                  </p>
                  <p
                    style={{
                      width: "20%",
                      textAlign: "center",
                      margin: "0 4px 0 0",
                    }}
                  >
                    Price
                  </p>
                </div>

                {data?.result &&
                  data?.result?.passenger.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        display: "flex",
                        padding: "5px 0 0 5px",
                        overflow: "hidden",
                      }}
                    >
                      <p style={{ width: "40%", margin: "0 4px 0 0" }}>
                        {`${item?.title} ${item?.firstName} ${item?.lastName}`}
                      </p>
                      <p
                        style={{
                          width: "20%",
                          textAlign: "center",
                          margin: "0 4px 0 0",
                        }}
                      >
                        {data?.result.pnr}
                      </p>
                      <p
                        style={{
                          width: "20%",
                          textAlign: "center",
                          margin: "0 4px 0 0",
                        }}
                      >
                        {item.seatNumber}
                      </p>
                      <p
                        style={{
                          width: "20%",
                          textAlign: "center",
                          margin: "0 4px 0 0",
                        }}
                      >
                        Rs. {item.Price}
                      </p>
                    </div>
                  ))}
              </div>

              <div
                style={{
                  width: "100%",
                  float: "left",
                  marginTop: "15px",
                  border: "1px solid #D6D8E7",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "#004684",
                    float: "left",
                    fontWeight: "bold",
                    padding: "5px",
                    paddingRight: "0px",
                    borderBottom: "1px solid #D6D8E7",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{ width: "100%", float: "left", marginRight: "0" }}
                  >
                    Bus Details
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 0 1px 5px",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>From:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Travels:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Journey Date:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>PNR:</strong>
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.origin}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.travelName}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {journeyDateFormatted}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>{data?.result?.pnr}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>To:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Bus Type:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Dep time:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Price:</strong>
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.destination}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.busType}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>{depTimeFormatted}</p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        ₹ {data?.result?.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  float: "left",
                  marginTop: "15px",
                  border: "1px solid #D6D8E7",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "#004684",
                    display: "flex",
                    fontWeight: "bold",
                    padding: "5px",
                    paddingRight: "0px",
                    borderBottom: "1px solid #D6D8E7",
                    color: "#fff",
                  }}
                >
                  <div style={{ width: "50%", marginRight: "0" }}>
                    Boarding Address
                  </div>
                  <div style={{ width: "50%", marginRight: "0" }}>
                    Bus Support No: 080-30916657
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "20%",
                    padding: "5px 0 0px 5px",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Location:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Landmark:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Address:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Boarding time:</strong>
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        <strong>Contact number:</strong>
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.BoardingPoint?.Location}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.BoardingPoint?.Landmark}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {data?.result?.BoardingPoint?.Address}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>
                        {boardingTimeFormatted}
                      </p>
                      <p style={{ margin: "0 4px 0 0" }}>1234567890</p>
                    </div>
                  </div>
                  <div>
                    <div>Bus Help Line Numbers</div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Ahmedabad</strong>
                        </p>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Bangalore</strong>
                        </p>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Chennai</strong>
                        </p>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Delhi</strong>
                        </p>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Hyderabad</strong>
                        </p>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Mumbai</strong>
                        </p>
                        <p style={{ margin: "0 4px 0 0" }}>
                          <strong>Pune</strong>
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                        <p style={{ margin: "0 4px 0 0" }}>:</p>
                      </div>
                      <div>
                        <p style={{ margin: "0 4px 0 0" }}>079-39412345</p>
                        <p style={{ margin: "0 4px 0 0" }}>080-39412345</p>
                        <p style={{ margin: "0 4px 0 0" }}>044-39412345</p>
                        <p style={{ margin: "0 4px 0 0" }}>011-39412345</p>
                        <p style={{ margin: "0 4px 0 0" }}>040-39412345</p>
                        <p style={{ margin: "0 4px 0 0" }}>022-39412345</p>
                        <p style={{ margin: "0 4px 0 0" }}>020-39412345</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  float: "left",
                  marginTop: "15px",
                  border: "1px solid #D6D8E7",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "#004684",
                    float: "left",
                    fontWeight: "bold",
                    padding: "5px",
                    paddingRight: "0px",
                    borderBottom: "1px solid #D6D8E7",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{ width: "100%", float: "left", marginRight: "0" }}
                  >
                    Cancellation Details
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 0 0px 5px",
                  }}
                >
                  <div>
                    <p style={{ margin: "0 4px 0 0" }}>
                      <strong>Cancellation time</strong>
                    </p>
                    {data?.result &&
                      data?.result?.CancelPolicy.map((policy) => (
                        <p
                          style={{ margin: "0 4px 0 0" }}
                          key={policy.PolicyString}
                        >
                          {policy.PolicyString}
                        </p>
                      ))}
                  </div>
                  <div>
                    <p style={{ margin: "0 4px 0 0" }}>
                      <strong>Cancellation charges</strong>
                    </p>
                    {data?.result &&
                      data?.result?.CancelPolicy.map((policy) => (
                        <p
                          style={{ margin: "0 4px 0 0" }}
                          key={policy.CancellationCharge}
                        >
                          {policy.CancellationCharge}%
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "5px",

                  paddingTop: "24px",
                  paddingBottom: "24px",
                  background: "white",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "12px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                  display: "flex",
                  width: "780px",
                }}
              >
                <div
                  style={{
                    color: "#d90429",
                    fontSize: "20px",
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  The Skytrails Support
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "48px",
                    justifyContent: "center",
                    alignItems: " center",
                    gap: "40px",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      padding: "12px",
                      // backgroundColor: "#b3b8bd",
                      borderRadius: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      display: "flex",
                    }}
                  >
                    <p
                      style={{
                        color: "#d90429",
                        fontSize: " 20px",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        wordWrap: "break-word",
                        margin: "0",
                      }}
                    >
                      +91 9209793097
                    </p>
                  </div>
                  <div
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "8px",
                      display: "flex",
                      // alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",

                          // background: "#21325d",
                        }}
                      >
                        <BiSupport color="d90429" />
                      </div>
                    </div>
                    <div
                      style={{
                        color: "#d90429",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        wordwrap: "break-word",
                      }}
                    >
                      Info@theskytrails.com
                    </div>
                  </div>
                </div>
              </div>
              </div>
            
              <div  style={{
                background: "#fff",
                overflow: "hidden",
                padding: "10px",
                maxWidth: "800px",
                border: "1px solid #D6D8E7",
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                margin: "10px auto"
                , overflowX: 'scroll'
            }}>
              <img
                src="https://travvolt.s3.amazonaws.com/app_banner.png"
                alt="SkyTrails_banner"
                style={{
                  width: "100%",
                  marginTop: "15px",
                  borderRadius: "15px",
                }}
              />
            </div>
            
            
            

            
          </div>
        </div>
      )}
    </>
  );
};
export default BusETicket;
