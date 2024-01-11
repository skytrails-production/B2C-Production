import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./busservices.css";
import { getAvailableSeatAction } from "../../../Redux/busSearch/busSearchAction";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Box from "@mui/material/Box";
import {  Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Items({ currentItems }) {
  // const dispatch = useDispatch();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(true);
  const reducerState = useSelector((state) => state);

  const busSearchResult =  reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.BusResults
  const items = [...Array(busSearchResult.length).keys()];
  const traceId = reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.TraceId  ;
  // Time formate
  const handleSubmit=(e)=>{
    e.preventDefault()
    const payload = {
      EndUserIp: reducerState?.ip?.ipData, 
      ResultIndex: 6,
      TraceId: traceId,
      TokenId: reducerState?.ip?.tokenData,
    }
    dispatch(getAvailableSeatAction(payload))
    navigate('/SelectBusSeat');
   }


  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    currentItems &&
    currentItems.map((item) => {
      const BusType = busSearchResult[item]?.BusType
      const TravelName = busSearchResult[item]?.TravelName
      const price = busSearchResult[item]?.BusPrice?.OfferedPrice
      const BasePrice = busSearchResult[item]?.BusPrice?.BasePrice
      const data = busSearchResult[item]?.ArrivalTime;
      console.error("ele",data)
      console.error("item",item)
      const date = new 
      Date(busSearchResult[item]?.ArrivalTime);
      const time = date.toTimeString().slice(0, 5);

     

      const dateString =  busSearchResult[item]?.ArrivalTime;
      console.error(".....<<<<", dateString);
      const date1 = new Date(dateString);
      const time1 = date1.toLocaleTimeString()?.slice(0, 4);

      const day1 = date1.getDate();
      const month1 = date1.toLocaleString("default", {
        month: "short",
      });
      const year1 = date1.getFullYear();
      const formattedDate1 = `${day1 + " "} ${month1 + " "} ${year1 + " "}`;

      const dateString1 = busSearchResult[item]?.DepartureTime;
      const date2 = new Date(dateString1);
      const time2 = `${date2.toLocaleTimeString()?.slice(0, 4)}  `;

      const day2 = `${date2.getDate()}  `;
      const month2 = date2.toLocaleString("default", {
        month: "short",
      });
      const year2 = date2.getFullYear();
      const formattedDate2 = `${day2}  ${month2} ${year2}`;

      return (
        <>
          <div className="side_container">
            {" "}
            <div className="container">
              {" "}
              <div className="row">
                {" "}
                <div className="col-md-8">
                  {" "}
                  <Box>
                    {" "}
                    <Box className="bus_name">
                      {" "}
                      <Typography className="bus_name">
                       {TravelName}
                      </Typography>
                       <Typography className="rating_bus">4.9/5</Typography>//{" "}
                      <Typography className="number_of_rate">
                        126 Ratings
                      </Typography>
                      {" "}
                    </Box>
                    {" "}
                    <Box className="bus_name">
                      {" "}
                      <Typography className="number_of_rate">
                        {BusType}
                      </Typography>
                      {" "}
                      <Box className="bus_name" px={2}>
                         {/* <AirlineSeatReclineNormalIcon /> */}
                        {" "}
                        <Typography className="number_of_rate">
                           {/* {ele?.AvailableSeats}{" "} */}
                        </Typography>
                        {" "}
                      </Box>
                    </Box>{" "}
                    <Box className="bus_name">
                      {" "}
                      <Typography className="timing_date">
                       {formattedDate2}
                      </Typography>
                       <Box className="vertical_line"></Box>{" "}
                      
                       <Box className="vertical_line"></Box>{" "}
                      <Typography className="timing_date">
                        {formattedDate1}
                      </Typography>
                      {" "}
                    </Box>
                    {" "}
                  </Box>
                   <Box></Box>{" "}
                </div>
                {" "}
                <div className="col-md-4">
                  {" "}
                  <Box className="pricing_container">
                     <GpsFixedIcon className="gps_icon" />
                    {" "}
                    <Typography className="live_tracking">
                      Live Tracking
                    </Typography>
                    {" "}
                  </Box>
                  {" "}
                  <Box mt={1}>
                    {" "}
                    <Typography className="starting_from">
                      Starting From
                    </Typography>
                    {" "}
                    <Box className="rate_container">
                      {" "}
                      <Typography className="starting_from">{price}</Typography>{" "}
                      <Typography className="starting_price">{BasePrice} </Typography>{" "}
                    </Box>
                     <Typography className="save_price">Save $70</Typography>
                    {" "}
                  </Box>
                  {" "}
                  <Box textAlign="right">
                    {" "}
                    <Box>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                        mb={1}
                      >
                        {/* action="/SelectBusSeat" */}
                        <form>
                          <Button
                            variant="contained"
                            type="submit"
                            data-toggle="collapse"
                            data-target="#multiCollapseExample2"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample2"
                            onClick={handleSubmit}
                          >
                            <Typography sx={{ cursor: "pointer" }}>
                              Book Seat
                            </Typography>
                          </Button>
                        </form>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    })
  );
}

export default function BasicGrid() {
  const reducerState = useSelector((state) => state);
 ////
 const results =  reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.BusResults
   // ============================================> paginations =================================//

  const items = [...Array(results.length)?.keys()];
  console.error("results",results)
  console.error("items",items)
  const itemsPerPage = 5;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
