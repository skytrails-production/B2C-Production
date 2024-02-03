import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hotelBlockRoomAction } from "../../../Redux/Hotel/hotel";

import availableRooms from "../../../images/Hotel/availableRooms.png"
import hotelMap from "../../../images/Hotel/hotelMap.png"
import hotelDetails from "../../../images/Hotel/hotelDetails.png"
import imageGallery from "../../../images/Hotel/imageGallery.png"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "white" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("State Data", reducerState);
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  const [expanded, setExpanded] = useState("panel1");
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const [disabledOption, setDisabledOption] = useState(
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.RoomCombinations?.RoomCombination[0]?.RoomIndex
  );
  // console.log("initialDisabledOption", disabledOption);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

  const hotelll = reducerState?.hotelSearchResult;
  // console.log(hotelll, "hotelll");
  //Below is the functionality applied for the multiRoom selection
  const roomComponent = (RoomIndex, RoomIndexArr, col, row) => {
    // console.log(RoomIndexArr, "RoomIndexArr");
    // console.log(RoomIndex, "RoomIndex", col, row);
    const firstFilteredArray = hotelRoom?.HotelRoomsDetails.map(
      (item, index) => {
        // console.log("disabled", disabledOption[0]);
        if (disabledOption.includes(item.RoomIndex)) {
          return { ...item, disabled: false };
        } else {
          return { ...item, disabled: true };
        }
      }
    );
    // console.log("firstFilteredArray", firstFilteredArray);
    const filteredComponent = firstFilteredArray.filter((item, index) => {
      return item.RoomIndex == RoomIndex;
    });
    // console.log("filteredComponent", filteredComponent);
    const dateString = filteredComponent[0]?.LastCancellationDate;
    const date1 = new Date(dateString);
    const time1 = date1.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = date1.getDate();
    const month = date1.toLocaleString("default", {
      month: "short",
    });
    const year = date1.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return (

      <div className="offer_area ">
        <div className="inneraccorHotel">
          <div className="roomTypeName">
            <p className="first">
              {filteredComponent[0]?.RoomTypeName}
            </p>
          </div>

          <div className="ratePlan">

            <input
              className="form-check-input"
              type="checkbox"
              style={{ width: "25px", height: "25px" }}
              value={filteredComponent[0]?.RoomIndex}
              disabled={row >= 0 && col > 0 && filteredComponent[0].disabled}
              checked={!filteredComponent[0].disabled}
              onClick={(e) => {
                setDisabledOption(RoomIndexArr);
              }}
            />
            <p className="text">
              {filteredComponent[0]?.RatePlanName}
            </p>
          </div>
          <div className="smolking">
            <p> Smoking Preference :  {" "}{filteredComponent[0]?.SmokingPreference}</p>
          </div>

          <p className="text">
            Last Cancellation till: {formattedDate}
          </p>
        </div >
        <div className="priceCheck">
          <p className="price">
            ₹{filteredComponent[0]?.Price?.PublishedPriceRoundedOff}
          </p>
          <div>
            <h3 onClick={(e) => {
              setDisabledOption(RoomIndexArr);
            }}>Select Room</h3>
          </div>
        </div>
      </div>


    );
  };
  const handleChoosenRoom = () => {
    const choosenRoom = [];
    const option = disabledOption;
    option.map((matchedItem, index) => {
      hotelRoom?.HotelRoomsDetails.map((item, index) => {
        if (item.RoomIndex == matchedItem) {
          choosenRoom.push(item);
        }
      });
    });

    return choosenRoom;
  };
  // console.log(handleChoosenRoom(), "chooseRoom");
  const handleClick = () => {
    sessionStorage.setItem("HotelIndex", disabledOption);
    const smoking =
      hotelRoom?.HotelRoomsDetails[disabledOption]?.SmokingPreference;
    var SmokingPreference;
    if (smoking == "NoPreference") {
      SmokingPreference = 0;
    }
    if (smoking == "Smoking") {
      SmokingPreference = 1;
    }
    if (smoking == "NonSmoking") {
      SmokingPreference = 2;
    }
    if (smoking == "Either") {
      SmokingPreference = 3;
    }
    const payload = {
      ResultIndex: ResultIndex,
      HotelCode: HotelCode,
      HotelName: hotelInfo?.HotelDetails?.HotelName,
      GuestNationality: "IN",
      NoOfRooms:
        reducerState?.hotelSearchResult?.ticketData?.data?.data
          ?.HotelSearchResult?.NoOfRooms,
      ClientReferenceNo: 0,
      IsVoucherBooking: true,

      HotelRoomsDetails: handleChoosenRoom().map((item, index) => {
        return {
          RoomIndex: item?.RoomIndex,
          RoomTypeCode: item?.RoomTypeCode,
          RoomTypeName: item?.RoomTypeName,
          RatePlanCode: item?.RatePlanCode,
          BedTypeCode: null,
          SmokingPreference: SmokingPreference,
          Supplements: null,
          Price: {
            CurrencyCode: item?.Price?.CurrencyCode,
            RoomPrice: item?.Price?.RoomPrice,
            Tax: item?.Price?.Tax,
            ExtraGuestCharge: item.Price?.ExtraGuestCharge,
            ChildCharge: item?.Price?.ChildCharge,
            OtherCharges: item?.Price?.OtherCharges,
            Discount: item?.Price?.Discount,
            PublishedPrice: item?.Price?.PublishedPrice,
            PublishedPriceRoundedOff: item?.Price?.PublishedPriceRoundedOff,
            OfferedPrice: item?.Price?.OfferedPrice,
            OfferedPriceRoundedOff: item?.Price?.OfferedPriceRoundedOff,
            AgentCommission: item?.Price?.AgentCommission,
            AgentMarkUp: item?.Price?.AgentMarkUp,
            ServiceTax: item?.Price?.ServiceTax,
            TCS: item?.Price?.TCS,
            TDS: item?.Price?.TDS,
            ServiceCharge: item?.Price?.ServiceCharge,
            TotalGSTAmount: item?.Price?.TotalGSTAmount,
          },
          GST: {
            CGSTAmount: item?.GST?.CGSTAmount,
            CGSTRate: item?.GST?.CGSTRate,
            CessAmount: item?.GST?.CessAmount,
            CessRate: item?.GST?.CessRate,
            IGSTAmount: item?.GST?.IGSTAmount,
            IGSTRate: item?.GST?.IGSTRate,
            SGSTAmount: item?.GST?.SGSTAmount,
            SGSTRate: item?.GST?.SGSTRate,
            TaxableAmount: item?.GST?.TaxableAmount,
          },
        };
      }),

      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId:
        reducerState?.hotelSearchResult?.ticketData?.data?.data
          ?.HotelSearchResult?.TraceId,
    };
    dispatch(hotelBlockRoomAction(payload));
  };

  return (

    <div className="row">



      <div className="col-lg-12 col-md-12 col-sm-12">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ border: "none", marginY: "20px" }}
        >
          <AccordionSummary
            sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Grid container>
              <Grid md={12}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <img src={availableRooms} style={{ width: "100%" }} />
                  </Box>
                  <Typography
                    ml={2}
                    color="#252525"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    Available Room(s)
                  </Typography>
                </Box>
              </Grid>
              <Grid md={6}>
                <Box display="flex" justifyContent="end"></Box>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: "20px",
              boxShadow: "0px 3px 6px #00000029",
              marginTop: "20px",
            }}
          >




            {/* <Box> */}
            {hotelRoom?.RoomCombinations?.RoomCombination.map(
              (item1, index1) => {
                return (
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        {item1?.RoomIndex?.map((item2, index2) => {
                          if (index2 == 0) {
                            return (
                              <div className="roomCompo" key={index2}>
                                {roomComponent(
                                  item2,
                                  item1?.RoomIndex,
                                  index2,
                                  index1
                                )}
                              </div>
                            );
                          }

                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
            {/* </Box> */}

            <Box></Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ border: "none", marginY: "20px" }}
        >
          <AccordionSummary
            sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Grid container>
              <Grid md={12}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <img src={imageGallery} style={{ width: "100%" }} />
                  </Box>
                  <Typography
                    ml={2}
                    color="#252525"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    Image Gallery
                  </Typography>
                </Box>
              </Grid>
              <Grid md={6}>
                <Box display="flex" justifyContent="end"></Box>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: "20px",
              boxShadow: "0px 3px 6px #00000029",
              margin: " 20px 0px",
            }}
          >
            <Box my={3} overflow="scroll" height="270px">
              <Grid container spacing={3} px={10}>
                {hotelInfo?.HotelDetails?.Images?.map((img, key) => {
                  return (
                    <Grid item sm={6} lg={4}>
                      <Box>
                        <img src={img} className="jacuzzy_img" />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ border: "none", marginY: "20px" }}
        >
          <AccordionSummary
            sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Grid container>
              <Grid md={12}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <img src={hotelDetails} style={{ width: "100%" }} />
                  </Box>
                  <Typography
                    ml={2}
                    color="#252525"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    Hotel Details
                  </Typography>
                </Box>
              </Grid>
              <Grid md={6}>
                <Box display="flex" justifyContent="end"></Box>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: "20px",
              boxShadow: "0px 3px 6px #00000029",
              margin: " 20px 0px",
            }}
          >
            <Box display="flex" justifyContent="left">

              <Box>
                <img src={hotelDetails} style={{ width: "100%" }} />
              </Box>
              <Typography
                sx={{ fontsize: "14px", color: "#252525", textAlign: "left" }}
                ml={2}
                mb={2}
              >
                Hotel Details
              </Typography>
            </Box>
            <Typography className="acc_para">
              <div
                dangerouslySetInnerHTML={{
                  __html: hotelInfo?.HotelDetails?.Description,
                }}
              />
            </Typography>

          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ border: "none", marginY: "20px" }}
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            sx={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000029" }}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Grid container>
              <Grid md={12}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <img src={hotelMap} style={{ width: "100%" }} />
                  </Box>
                  <Typography
                    ml={2}
                    color="#252525"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    Hotel Map
                  </Typography>
                </Box>
              </Grid>
              <Grid md={6}>
                <Box display="flex" justifyContent="end"></Box>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: "20px",
              boxShadow: "0px 3px 6px #00000029",
              marginTop: "20px",
            }}
          >
            <Typography
              sx={{ fontsize: "14px", color: "#252525", textAlign: "left" }}
              mb={1}
            >
              Hotel Map Details
            </Typography>
            <Typography className="acc_para">
              <Alert severity="error">
                {" "}
                Currently Map Details is Not Available !!!
              </Alert>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="col-lg-12 bokknnbuuu">
        <button type="submit" className="bookNowButton" onClick={handleClick}>Continue</button>
      </div>
    </div>

  );
}
