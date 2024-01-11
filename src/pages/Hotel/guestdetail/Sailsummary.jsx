import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import './sailsummary.css';
import "./guestdetail.css";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function Popularfilter() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const reducerState = useSelector((state) => state);


  // const TotalGuest = sessionStorage.getItem("totalGuest");
  const HotelIndex = sessionStorage.getItem("HotelIndex");
  // console.log(HotelIndex, "hotel index in summary")

  // const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;
  const hotelData = hotelRoom?.HotelRoomsDetails?.[HotelIndex];


  const noOfRooms =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;


  const getBookingDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult?.HotelRoomsDetails;

  // console.log(getBookingDetails, "booking details")
  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);


  // const roomBlock = reducerState?.hotelSearchResult?.blockRoom;
  // console.log(roomBlock, "room block ")


  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;
  // console.log("fareValue", markUpamount);


  const grandTotal = totalAmount + markUpamount;

  // const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));

  return (
    <>
      <div className="priceSummaryHotel">
        <div className="head">
          <span>Price Summary</span>
        </div>
        <div className="hotName">
          <p>{hotelData?.RoomTypeName}</p>
        </div>
        <div className="priceChart">
          <div >
            <span className="text-bold">Rate</span>
          </div>
          <div >
            <span>Published</span>
            <p>{'₹'}{totalAmount}</p>
          </div>
          <div >
            <span>Other Tax</span>
            <p>{'₹'}{markUpamount}</p>
          </div>
          <div >
            <span className="text-bold">No of Rooms</span>
            <p className="text-bold"> {noOfRooms?.NoOfRooms}</p>
          </div>
        </div>
        <div className="TotGst">
          <div >
            <span>Grand Total:</span>
            <p>{'₹'}{grandTotal}</p>
          </div>
        </div>

      </div>

    </>
  );
}
