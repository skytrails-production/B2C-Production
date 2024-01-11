import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import "./hotelbillainfo.css";
import { useNavigate } from "react-router-dom"

const HotelInfoCard = () => {
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate()
  const hotelDetails =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
      ?.HotelResults;

  const handleBookHotel = (resultIndex, hotelCode) => {
    sessionStorage.setItem("ResultIndex", resultIndex);
    sessionStorage.setItem("HotelCode", hotelCode);
    navigate("/hotel/HotelSearchResult")
  };
  return (
    <div className="hotel_detail_main_container">
      {hotelDetails?.map((ele, indx) => {
        // ⬇️ create variable 
        const resultIndex = ele?.ResultIndex;
        const hotelCode = ele?.HotelCode;
        return (
          <div


            key={indx}
            className="boxshaow hotel-result-container"
            onClick={() => {
              handleBookHotel(resultIndex, hotelCode);
            }}



          >
            <div className="booking_card_left">
              <div className="booking_card_left_left">
                <div >
                  <img src={ele?.HotelPicture} className="hotel_Detail_Card_img" />
                </div>
                <div className="hotel_right_left">

                  <div className="hotel_name_container">
                    <h1 className="hotel_name1">{ele?.HotelName}</h1>
                    <Rating
                      name="read-only"
                      value={ele?.StarRating}
                      readOnly
                      size="small"
                    />
                  </div>
                  <div>
                    <div >
                      <h1 className="hotel_address1">
                        {ele?.HotelAddress}{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="Free_Cancellation_div">
                    <div className="Free_Cancellation"

                    >
                      Free Cancellation till check-in

                    </div>
                    <div
                      className="Money_Back"
                    >
                      100% Money Back Guarantee on Clean rooms with TV,AC & Free Wi-Fi

                    </div>
                  </div>

                </div>
              </div>



              <div
                className="hitel_detail_right"
              >
                <div>
                  <h1
                    className="OfferedPrice"
                  >
                    {ele?.Price?.OfferedPrice}
                  </h1>

                  <h1
                    className="PublishedPrice"
                  >
                    ₹{ele?.Price?.PublishedPrice}
                  </h1>
                  <p className="extra_price">+₹ 1,181 taxes & fees Per Night</p>
                </div>
                <div>
                  <h1 className="hotel_detail_no_cost">No Cost EMI <span>starts at ₹6,281</span></h1>
                </div>
                <form action="/hotel/HotelSearchResult" >
                  <Button variant="contained" textAlign="right" type="submit" onClick={() => {
                    handleBookHotel(resultIndex, hotelCode);
                  }}>
                    Book Now
                  </Button>
                </form>
              </div>


            </div>
            <div className="exclusive_discount">

              Exclusive discount of INR 6832 applied on your 1st Hotel booking

            </div>
          </div>
        )

      })}

    </div>
  );
};

export default HotelInfoCard;
