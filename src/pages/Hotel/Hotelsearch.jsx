import React, { useEffect, useState } from "react";
// hotel tabs
import LinearProgress from '@mui/material/LinearProgress';
import { Grid, Box } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { apiURL } from '../../Constants/constant';
import { HiCheck } from "react-icons/hi2";

// bootstrap
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { clearHotelReducer, hotelAction } from "../../Redux/Hotel/hotel";
// import { styled } from '@mui/material/styles';
import { SlArrowRight } from "react-icons/sl";

import "./hotelhome.css"
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles'

const StyledStaticDatePicker = styled(StaticDatePicker)({
  '.MuiPickersToolbar-root': {
    color: '#bbdefb',
    borderRadius: 3,
    borderWidth: 0,
    borderColor: '#2196f3',
    border: '0px solid',
    backgroundColor: '#0d47a1',
    width: '300px !important',
  }
})



const Homeform = (props) => {
  const initialvalue = {
    City: "",
    nationality: "",
    room: "1",
    adult: "1",
    child: "0",
    star: "5"
  };
  const roomInitialValue = {
    room: "2",
    adult: "2",
    child: "2",

  }

  const [room, setRoom] = useState([initialvalue, initialvalue])
  const [values, setValues] = React.useState(initialvalue);
  console.warn(values, "child value")
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("State Data", reducerState);

  const errorCode =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
      ?.Error?.ErrorCode;
  const errorMsg =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
      ?.Error?.ErrorMessage;

  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = React.useState(false);
  const [date, setDate] = React.useState("2023-11-22");
  const [oldDate, setOldDate] = React.useState("2023-11-22");
  const [isVisible, setIsVisible] = useState(false);
  const [from, setFrom] = useState("");
  const [fromQuery, setFromQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(0);
  const [fromSearchResults, setFromSearchResults] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [displayFrom, setdisplayFrom] = useState(true);
  const [display, setDisplay] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authenticUser = reducerState?.logIn?.isLogin
  const [offersToggle, setOffersToggle] = useState(1)
  const [offersToggle1, setOffersToggle1] = useState(0)
  const [star, setStar] = useState(5)
  const [roomValue, setRoomValue] = useState(1)
  const [passengerDetails, setPassengerDetails] = useState([])
  const roomOrignal = [{ room: 1, adult: 0, child: 0, childAge: [] }]
  const [roomOrignal1, setroomOrignal] = useState([{ room: 1, adult: 0, child: 0, childAge: [] }])



  const passengerDetail = []

  const changeHandler = (e) => {
    if (e.target.value === "number") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    dispatch(clearHotelReducer());
  }, [dispatch]);

  useEffect(() => {
    if (reducerState?.hotelSearchResult?.isLoading == true) {
      setLoader(true);
    }
  }, [reducerState?.hotelSearchResult?.isLoading]);

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      setIsLoading(true);

      // make an API call to get search results

      const results = await axios.post(
        `${apiURL.baseURL}/skytrails/city/hotelCitySearch?keyword=${fromQuery}`
      );
      if (mounted) {
        // console.log("Result", results);
        setFromSearchResults(results?.data?.data);
        setIsLoading(false);
      }
    };

    if (fromQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [fromQuery]);

  const handleFromClick = (result) => {
    setFrom(result.cityid);
    setDisplay(result.Destination);
    setSelectedFrom(result);
    setdisplayFrom(false);
  };
  useEffect(() => {
    const roomss = []
    for (let i = 1; i <= roomValue; i++) {
      roomss.push({ room: i, adult: 1, child: 0, childAge: [] })
    }

    setroomOrignal(roomss)
    // console.log("Room value", roomValue)
    // console.warn("RoomSS:", roomOrignal1)
  }, [roomValue])

  const handleFromInputRoomChange = async (event) => {
    // setdisplayFrom(true);
    // setFrom(event.target.value);
    // setDisplay(event.target.value);
    // setSelectedFrom(null);
    await setRoomValue(event.target.value);


  };



  const handleFromInputChange = (event) => {
    setdisplayFrom(true);
    setFrom(event.target.value);
    setDisplay(event.target.value);
    setSelectedFrom(null);
  };

  const handleFromSearch = (e) => {
    console.error(e);
    setFromQuery(e);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  function getMonthDayInEnglish(dateString) {
    // Parse the input date string
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Create a Date object
    const date = new Date(year, month - 1, day);

    // Get the month and day names
    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MRY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // const d = new Date();
    let day1 = weekday[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const dayName = date.getDate();

    // Return the result
    return `${monthName} ${day1}`;
  }
  const [MonthDayInEnglish1, setMonthDayInEnglish1] = useState("NOV Saturday")
  const [MonthDayInEnglish2, setMonthDayInEnglish2] = useState("NOV Saturday")

  function handleSubmit(event) {
    // console.log(nightdays, "44444444444444s4s4s4444444444444444444444444444")

    event.preventDefault();

    // console.log("2222222222222222222222222222222222222222222222222222222222222222222222222222222222222")
    if (
      values.City.length < 1 ||
      values.nationality.length < 1 ||
      values.room.length < 1 ||
      values.adult.length < 1
    ) {
      setError(true);
    }
    const formData = new FormData(event.target);
    // Convert input date to desired format
    const date = new Date(formData.get("departure"));
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    // const childCount = formData.get("child")
    // const adultCount = formData.get("adult")
    // const nightCount = formData.get("night")
    // const roomCount = formData.get("room")
    const childCount = values.child
    const adultCount = values.adult
    const nightCount = values.nightdays
    const roomCount = values.room
    // console.log("authenticUser", authenticUser);

    // const payload = {
    //   CheckInDate: formattedDate,
    //   NoOfNights: nightdays,
    //   CountryCode: "IN",
    //   CityId: from,
    //   ResultCount: null,
    //   PreferredCurrency: "INR",
    //   GuestNationality: "IN", //formData.get("nationality"),
    //   NoOfRooms: formData.get("room"),
    //   RoomGuests: [
    //     {
    //       NoOfAdults: values.adult,
    //       // NoOfChild: values.child,
    //       NoOfChild: "0",
    //       ChildAge: null,
    //     },
    //   ],
    //   // MaxRating: formData.get("star"),
    //   MaxRating: 5,
    //   MinRating: 0,
    //   ReviewScore: null,
    //   IsNearBySearchAllowed: false,
    //   EndUserIp: reducerState?.ip?.ipData,
    //   TokenId: reducerState?.ip?.tokenData,
    // };
    const payload = {
      CheckInDate: formattedDate,
      NoOfNights: formData.get("night"),
      CountryCode: "IN",
      CityId: from,
      ResultCount: null,
      PreferredCurrency: "INR",
      GuestNationality: "IN", //formData.get("nationality"),
      NoOfRooms: formData.get("room"),
      RoomGuests: [
        {
          NoOfAdults: formData.get("adult"),
          NoOfChild: "0",
          ChildAge: null,
        },
      ],
      MaxRating: formData.get("star"),
      MinRating: 0,
      ReviewScore: null,
      IsNearBySearchAllowed: false,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
    };

    // console.log("payload", payload);

    // const totalGuest = `${parseInt(formData.get("adult")) + parseInt(formData.get("child"))
    const totalGuest = `${parseInt(values.adult) + parseInt(values.child)
      }`;
    sessionStorage.setItem("totalGuest", totalGuest);

    // Dispatch of hotel search
    dispatch(hotelAction(payload));



    sessionStorage.setItem("child Count", childCount);
    sessionStorage.setItem("adult Count", adultCount);
    sessionStorage.setItem("night Count", nightCount);
    sessionStorage.setItem("room Count", roomCount);
    console.error("authenticUser✌️", authenticUser)
    if (authenticUser) {
      navigate(`HotelDetails?adult=${adultCount}&child=${childCount}`);
    } else {
      setIsModalOpen(true)
    }

    if (
      reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
        ?.ticketData?.data?.data
    ) {
      setOpen(false);

    }
    setOpen(true);
  }


  function disablePastDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }

  function disablePastDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
  const disableNexttDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  // checkin checkout function

  const handlechnage = (e) => {
    const time = e.target.value;
    // console.log("time is", time);
    setDate(time);
    // setOldDate(time)
  };

  const handlechnageone = (e) => {
    const time = e.target.value;
    // console.log("time is", time);
    setOldDate(time);

  };

  // const[year,month,day]=oldDate.split('-');
  const currentDate = new Date(date);
  const toDate = new Date(oldDate);
  const list = toDate - currentDate;
  const nightdays = list / 86400000;
  const fromSearchRef = React.useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideFrom);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFrom);
    };
  }, []);

  const handleClickOutsideFrom = (event) => {
    if (
      fromSearchRef.current &&
      !fromSearchRef.current.contains(event.target)
    ) {
      setdisplayFrom(false);
    }
  };
  console.warn(values, "child count")
  async function handleMonthDayInEnglish1(e) {
    // await setDate(e.target.value)
    await setDate(`${e.$y}-${e.$M + 1}-${e.$D}`)
    const new1 = await getMonthDayInEnglish(date)
    await setMonthDayInEnglish1(new1)
    // console.log(e, date, new1, "////////////////////////////////////////////////////////////////////////")
    // setDate({ e }); // Update the departure date


  }
  async function handleMonthDayInEnglish2(e) {
    // await setOldDate(e.target.value)
    await setOldDate(`${e.$y}-${e.$M + 1}-${e.$D}`)
    const new1 = await getMonthDayInEnglish(oldDate)
    await setMonthDayInEnglish2(new1)
    // console.log(new1, "////////////////////////////////////////////////////////////////////////")

  }
  const handleOpen1 = () => {
    const input = document.getElementById('departure1');

    input.click();
  };
  const handleOpen2 = () => {
    const input = document.getElementById('departure2');

    input.click();
  };
  function handleChildAge(e, index, i) {
    let data = { ...roomOrignal1 }
    data[index].childAge[i] = { rooom: Number(e) };
    setroomOrignal(data)
    // roomOrignal[index].childAge[i]=Number(e);
    // roomOrignal[index]={...roomOrignal[index],childAge:(childAge[]=e)}
  }
  const renderChildrenAges = (index) => {
    const childrenAges = [];

    for (let i = 0; i <= roomOrignal1[index]?.child - 1; i++) {
      // You can modify this logic based on how you want to calculate or obtain the ages
      const age = Math.floor(Math.random() * 18) + 1; // Random age between 1 and 18
      childrenAges.push(<div key={i} className="child_input_box" onChange={(e) => handleChildAge(e.target.value, index, i)}>Child {i}<select className="select_S"
        name="room"
      // value={values.room}
      // onChange={handleInputChange}
      >

        <option className="option_0" value={1}>1 yrs</option>
        <option className="option_0" value={2}>2 yrs</option>
        <option className="option_0" value={3}>3 yrs</option>
        <option className="option_0" value={4}>4 yrs</option>
        <option className="option_0" value={5}>5 yrs</option>
        <option className="option_0" value={6}>6 yrs</option>
        <option className="option_0" value={7}>7 yrs</option>
        <option className="option_0" value={8}>8 yrs</option>
        <option className="option_0" value={9}>8 yrs</option>
        <option className="option_0" value={10}>10 yrs</option>
        <option className="option_0" value={11}>11 yrs</option>
        <option className="option_0" value={12}>12 yrs</option>

      </select>


      </div>);
    }

    return childrenAges;
  };
  const length = 3;
  const init = 0;
  const room1 = 2
  const handleInputChangeAdult = (e, index) => {
    const data = { ...roomOrignal1 }
    data[index].adult = Number(e)
    setroomOrignal(data)

  }
  const handleInputChangeChild = async (e, index) => {
    let data = await { ...roomOrignal1 };
    data[index].child = Number(e)
    setroomOrignal(data)
    let age = []
    for (let i = 0; i < roomOrignal1[index].child; i++) {
      let room = `room${i}`
      age.push({ room: 0 })

    }
    data = { ...roomOrignal1 };
    data[index].childAge = age
    setroomOrignal(data)

  }
  // const result = Array.from({ length }, () => "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  // const result=   Array.from({ room1 }, () => {

  // })
  function RoomData() {
    let data = []

    for (let i = 0; i <= roomValue; i++) {
      for (let i = 0; i <= roomOrignal[i].adult; i++) {



      }
    }
  }
  function range(end) {
    return Array.from({ length: end }, (_, index) => (<div className="room_flex">
      <div key={index}>
        <h1>Room {index + 1}</h1>
      </div>
      <div  >

        <h1>
          Adults
        </h1>
        <select className="select_S"
          name="adult"
          value={roomOrignal1[index]?.adult}
          onChange={(e) => handleInputChangeAdult(e.target.value, index)}
        >

          <option className="option_0" value='1'>1</option>
          <option className="option_0" value='2'>2</option>
          <option className="option_0" value='3'>3</option>
          <option className="option_0" value='4'>4</option>
          <option className="option_0" value='5'>5</option>
          <option className="option_0" value='6'>6</option>
          <option className="option_0" value='7'>7</option>
          <option className="option_0" value='8'>8</option>

        </select>
      </div>
      <div >
        <h1>
          Children
          <p className="age-12"> 0-12 Years</p>
        </h1>
        <select className="select_S"
          name="child"
          // value={roomOrignal1[index].child}
          onChange={(e) => handleInputChangeChild(e.target.value, index)}

        >
          <option className="option_0" value='0'>0 </option>
          <option className="option_0" value='1'>1 </option>
          <option className="option_0" value='2'>2 </option>
          <option className="option_0" value='3'>3 </option>
          <option className="option_0" value='4'>4 </option>
          <option className="option_0" value='5'>5 </option>
          <option className="option_0" value='6'>6 </option>
          <option className="option_0" value='7'>7 </option>
          <option className="option_0" value='8'>8 </option>
          <option className="option_0" value='9'>9 </option>
          <option className="option_0" value='10'>10 </option>
          <option className="option_0" value='11'>11 </option>
          <option className="option_0" value='12'>12 </option>

        </select>
      </div>
      {roomOrignal1[index]?.child !== 0 &&
        <div className="child">
          <div>
            <h1 >
              Age of Children
            </h1>
          </div>
          <div className="child1">
            {renderChildrenAges(index)}

          </div>

        </div>
      }
    </div>));
  }

  // console.warn(range(10), "result8888888888888888888888888888888888");

  const handleRommAdd = () => {
    for (let i = 0; i < roomInitialValue.room; i++) {
      for (let j = 0; j < roomInitialValue.room; j++) {
        passengerDetail.push({
          City: "",
          nationality: "",
          room: i + 1,
          adult: j + 1,
          // child: "0",
          star: "5"
        })
      }
      for (let k = 0; k < initialvalue.room; k++) {
        passengerDetail.push({
          City: "",
          nationality: "",
          room: i + 1,
          //  adult: j,
          child: k + 1,
          star: "5"
        })
      }

    }


  }
  return (
    <>

      <section >
        <div className="container homeform_container 
         try1">


          <form onSubmit={handleSubmit}>
            <div className="hero_Banner1">
              <Grid container id="grid_1" columnSpacing={{ xs: 3, sm: 2, md: 0 }}
                rowSpacing={{ xs: 3, sm: 2, md: 0 }}
                justifyContent="space-between"

              >
                <Grid item xs={12} sm={5.5} md={3}

                  id="hero1" className="hero0" onMouseEnter={() => {
                    setIsLoading(true)

                    setIsLoadingState(1)
                  }}
                  onMouseLeave={() => {
                    setIsLoading(false)
                    setIsLoadingState(0)
                  }}>
                  <div className="city1" >
                    <h4 >City, Property Name Or Location</h4>
                    <h1 >{display === "" ? "City" : display}</h1>
                    <p  >Country</p>
                  </div>
                  {isLoading && isLoadingState === 1 &&
                    <div className="loading1">
                      <div className="loading_input_container1">

                        <CiSearch />
                        <input
                          name="from"
                          placeholder="Where do you want to stay?"
                          value={display}
                          autoComplete="off"
                          onChange={(event) => {
                            handleFromInputChange(event);
                            handleFromSearch(event.target.value);
                          }}
                          required
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            height: "3.3rem",
                            // border: "3px solid #70707069",
                            paddingLeft: "25px",
                          }}
                        />
                      </div>

                      {isLoading &&
                        <Box sx={{ width: '100%' }}>
                          <LinearProgress color="inherit" />
                        </Box>
                      }

                      {fromSearchResults &&
                        fromSearchResults.length > 0 && (
                          <div
                            ref={fromSearchRef}
                            className="loading_input_container_main_div"
                            style={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              zIndex: 1999900,
                              width: "100% !important",
                              boxShadow:
                                "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                              textAlign: "left",
                              cursor: "pointer",
                              background: '#fff',
                              display: displayFrom ? "block" : "none",
                            }}
                          >
                            <ul
                              className="loading_input_container_search"
                            >
                              <Box
                              // sx={{
                              //   mb: 1,
                              //   mt: 1,
                              //   display: "flex",
                              //   flexDirection: "column",
                              //   maxHeight: 160,
                              //   overflow: "hidden",
                              //   overflowY: "scroll",
                              //   width: "100% !important",
                              // }}
                              // className="scroll_style"
                              >
                                {fromSearchResults.map((result) => (

                                  <li
                                    className="to_List1"
                                    key={result._id}
                                    onClick={() =>
                                      handleFromClick(result)
                                    }
                                  >
                                    <div >

                                      <span
                                      // className="to_List_container"
                                      >
                                        <CiLocationOn size="24px"
                                          color="#071C2C" />

                                        <strong>
                                          {result.Destination}
                                        </strong>
                                        {" "}
                                        {result.country}
                                        {/* <strong
                                          className="to_airport_code"
                                          style={{
                                            color: "gray",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {result.AirportCode}
                                        </strong> */}
                                      </span>
                                      {/* <span
                                        style={{
                                          fontSize: "13px",
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {result.code}
                                      </span> */}
                                    </div>
                                  </li>
                                ))}
                              </Box>
                            </ul>
                          </div>
                        )}
                    </div>}
                </Grid>
                <Grid item xs={12} sm={5.5} md={2} id="hero2" className="hero0" onMouseEnter={() => {
                  setIsLoading(true)

                  setIsLoadingState(2)
                  // handleOpen1()
                }}
                  onMouseLeave={() => {
                    setIsLoading(false)
                    setIsLoadingState(0)
                  }} >
                  <div className="hero_date" >
                    <div >

                      <h4 className="check_date" >Check-In</h4>
                      <SlArrowRight size={10} />

                    </div>
                    <h1 variant="h1" sx={{

                    }} > {date.slice(8, 10)} <span>{MonthDayInEnglish1.slice(0, 3)} {date.slice(2, 4)}</span> </h1>

                    <p variant="p" sx={{

                    }}  >{MonthDayInEnglish1.slice(4)} </p>
                    {/* <h1>{date}</h1> */}
                  </div>
                  <div
                    className="loading1"
                  >
                    {isLoading && isLoadingState === 2 && <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          'DatePicker',
                          'MobileDatePicker',
                          'DesktopDatePicker',
                          'StaticDatePicker',
                        ]}
                      >


                        <StaticDatePicker sx={{
                          '.MuiPickersToolbar-root': {
                            color: '#bbdefb',
                            borderRadius: 3,
                            borderWidth: 0,
                            borderColor: '#2196f3',
                            border: '0px solid',
                            backgroundColor: '#0d47a1',

                            gap: 0,
                            padding: 0,

                          },
                        }}
                          defaultValue={dayjs(date)}
                          selected={dayjs(date)}
                          onChange={handleMonthDayInEnglish1}
                        // minDate={(new Date()).toISOString().split('T')[0]}
                        // minDate={(new Date()).toISOString().split('T')[0]}
                        // min={disablePastDate()}
                        // minDate={new Date()} 
                        />

                      </DemoContainer>
                    </LocalizationProvider>}
                    {/* {isLoading && isLoadingState === 2 && <input
                      type="Date"
                      name="departure"
                      id="departure1"
                      className="deaprture_input"
                      value={date}
                      onChange={handleMonthDayInEnglish1}
                      min={disablePastDate()}

                    />} */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={5.5} md={2} id="hero3" className="hero0" onMouseEnter={() => {
                  setIsLoading(true)

                  setIsLoadingState(3)
                  handleOpen2()
                }}
                  onMouseLeave={() => {
                    setIsLoading(false)
                    setIsLoadingState(0)
                  }}>
                  <div  >
                    <div>

                      <h4 className="check_date">Check-Out</h4>
                      <SlArrowRight size={10} />

                    </div>
                    <h1 sx={{

                    }} >
                      {oldDate.slice(8, 10)}
                      {/* {oldDate}  */}
                      <span>{MonthDayInEnglish2.slice(0, 3)} {oldDate.slice(2, 4)}</span>
                    </h1>
                    <p variant="p" sx={{

                    }}  >{MonthDayInEnglish2.slice(4)}</p>
                  </div>
                  {isLoading && isLoadingState === 3 && <div className="loading1">

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          'DatePicker',
                          'MobileDatePicker',
                          'DesktopDatePicker',
                          'StaticDatePicker',
                        ]}
                      >


                        <StaticDatePicker sx={{
                          '.MuiPickersToolbar-root': {
                            color: '#bbdefb',
                            borderRadius: 3,
                            borderWidth: 0,
                            borderColor: '#2196f3',
                            border: '0px solid',
                            backgroundColor: '#0d47a1',

                          },
                        }}
                          defaultValue={dayjs(oldDate)}
                          selected={dayjs(oldDate)}
                          onChange={handleMonthDayInEnglish2}


                        />

                      </DemoContainer>
                    </LocalizationProvider>
                    {/* <input
                      type="date"
                      name="checkOutDeparture"
                      id="departure2"
                      className="deaprture_input"
                      value={oldDate}
                      onChange={handleMonthDayInEnglish2}
                      min={disableNexttDate()}
                      placeholder="Night"
                      autofocus

                    /> */}
                  </div>}
                </Grid>

                <Grid item xs={12} sm={5.5} md={3} id="hero4" className="hero0" onMouseEnter={() => {
                  setIsLoading(true)

                  setIsLoadingState(4)
                }}
                  onMouseLeave={() => {
                    setIsLoading(false)
                    setIsLoadingState(0)
                  }}>
                  <div >

                    <div>
                      <h4 className="check_date">Rooms & Guests</h4>
                    </div>
                    <div className="rooms" >
                      <div >

                        <h4 id="date_room"></h4>
                        <p id="date_p">Room{ }</p>
                      </div>
                      <div>

                        <h4 id="date_room"></h4>
                        <p id="date_p"> Adults{ }</p>
                      </div>
                      <div>

                        <h4 id="date_room"></h4>
                        <p id="date_p"> child</p>
                      </div>
                    </div>

                  </div>
                  {
                    isLoading && isLoadingState === 4 &&
                    <div className="loading1 rooms1 ">
                      <div >
                        <h1>
                          Rooms
                        </h1>
                        <select className="select_S"
                          name="room"
                          value={roomValue}
                          onChange={(event) => handleFromInputRoomChange(event)}
                        >

                          <option className="option_0" value="1">1</option>
                          <option className="option_0" value="2">2</option>
                          <option className="option_0" value="3">3</option>
                          <option className="option_0" value="4">4</option>
                          <option className="option_0" value="5">5</option>
                          <option className="option_0" value="6">6</option>

                        </select>
                      </div>

                      {range(roomValue)}


                      <div>
                        <p className="please_provide">
                          Please provide right number of children along with their right age for best options and prices.
                        </p>
                      </div>
                      <div className="btn-apply-div">
                        <div id="btn-apply" onClick={handleRommAdd}>
                          APPLY
                        </div>
                      </div>


                    </div>}

                </Grid>
                <Grid item xs={12} sm={5.5} md={2} id="hero5" className="hero0" onMouseEnter={() => {
                  setIsLoading(true)

                  setIsLoadingState(5)
                }}
                  onMouseLeave={() => {
                    setIsLoading(false)
                    setIsLoadingState(0)
                  }}>
                  <div >

                    <div>
                      <h4 className="check_date">Price Per Rating</h4>
                    </div>
                    <div className="rooms" >
                      <h4 className="star_h4">{values.star} Star</h4>

                    </div>

                  </div>
                  {isLoading && isLoadingState === 5 && <div className="loading1 ">
                    <select className="select_S"
                      name="room"
                      value={values.star}
                      onChange={(e) => setValue({ ...values, star: e.target.value })}

                    // onChange={handleInputChangeStar}
                    >
                      <option className="option_0" value={1}>1 Star</option>
                      <option className="option_0" value={2}>2 Star</option>
                      <option className="option_0" value={3}>3 Star</option>
                      <option className="option_0" value={4}>4 Star</option>



                    </select>
                  </div>}
                </Grid>
              </Grid>
              <div className="Trending">
                <div className="Trending2">

                  <h1>Trending Searches:</h1>
                </div>
                <div className=" Trending1" >

                  <div className="Trending3">

                    <h1>Singapore, Singapore</h1>
                  </div>
                  <div className="Trending3">

                    <h1>Dubai, United Arab Emirates</h1>
                  </div>
                  <div className="Trending3">

                    <h1>Mumbai, India</h1>
                  </div>

                </div>
                <div>
                  <Button id="btn-ht-search"
                  // type="submit"
                  // onClick={()=>console.log(values,"%%%%%%%%%%%5")}

                  >
                    Search
                  </Button>
                </div>

              </div>
            </div>
          </form>
          <div className="Value-stays ">
            <div className="Value-main">
              <div className="Value-left">
                <h1 className="value-h1">Value Stays</h1>
                <p>Top Rated Affordable Properties</p>
                <div>

                  <p>Know more</p>
                </div>
              </div>
              <div className="Value-right">
                <div >

                  <h4><HiCheck /> 100% Money Back Guarantee*</h4>
                </div>
                <div>


                  <h4> <HiCheck /> Hassle-Free Check-In</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="hero_banner_Img">
            <div className="hero_banner_Img-left">
              <h1 className="gradient-text">Skytrails</h1>
              <h4 className="gradient-text">Lavish Collection</h4>
              <p>Unparalleled opulence, world-class amenities, tailored for you.</p>
            </div>

          </div>
          <div className="LOREM">
            <h1>LOREM IPSUM</h1>
          </div>

        </div>
      </section>
    </>

  );
};

export default Homeform;