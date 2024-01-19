import axios from "axios";
import { apiURL } from "../../Constants/constant";

function api() {
  const userIP = (formData) => {
    return axios.get("https://api.ipify.org?format=json");
  };

  const markUp = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/api/admin/getMarkup`);
  };

  const userB2BToken = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/token",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const userB2CLogin = (payload) => {
    // console.log("payload", payload);
    const token = sessionStorage.getItem("jwtToken");
    // console.log("jwt token", token);
    return axios({
      method: "PUT",
      url: "/skytrails/api/user/verifyUserOtp",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };








  // const loginUserData = () => {
  //   const token = sessionStorage.getItem("jwtToken");
  //   return axios({
  //     method: "GET",
  //     url: "/skytrails/api/user/getUserProfile",
  //     baseURL: `${apiURL.baseURL}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "token": token,
  //     },
  //   });
  // };

  // Flight Api start From here ⬇️
  const oneWaySearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/search/oneway",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightQuoteSearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/farequote",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightRuleSearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/farerule",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightBookGDS = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/flight/booking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightGetTicketLcc = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/flight/getticketlcc",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightGetTicketNonLcc = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/flight/getticketnonlcc",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const flightBookingDataSave = (payload) => {
    const token = sessionStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "skyTrails/api/user/flightBooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };

  //Hotel API's Start
  const hotelSearch = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/hotel/search/dedup",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelSearchInfo = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/hotel/searchinfo",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelRoomInfo = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/hotel/room",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBlockRoom = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/hotel/blockroom",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookRoom = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/hotel/bookroom",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookingDetails = (payload) => {
    // console.log("payload of api 👍");
    return axios({
      method: "POST",
      url: "skyTrails/hotel/bookingdetails",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const hotelBookingDetailsSave = (payload) => {
    const token = sessionStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/api/user/hotelBooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  }

  // Holiday Package API
  const searchPackage = (payload) => {
    // console.log("searchPackage" + payload.destination);
    // console.log("searchPackage" + payload.days);
    const { destination, days } = payload;
    // ?filter=${days}&keyword=${destination}
    return axios.get(
      `${apiURL.baseURL}/skyTrails/international/getAll?keyword=${destination}`
    );
  };



  // holidayCategory details

  // const holidayCategory = (payload) => {
  //   // console.log("searchPackage" + payload.destination);
  //   // console.log("searchPackage" + payload.days);
  //   const { category } = payload;
  //   // ?filter=${days}&keyword=${destination}
  //   return axios.get(
  //     `${apiURL.baseURL}/skyTrails/beachesPackages?${category}=true`
  //   );
  // };

  // holidayCategory details 



  const getOnePackage = (payload) => {
    // console.log("getOnePacked", payload);
    const { id } = payload;
    return axios.get(`${apiURL.baseURL}/skyTrails/international/getone/${id}`);
  };

  const bookingHoliday = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/international/pakageBooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const passengerData = (payload) => {
    // console.log("Passenger payload", payload);
    return payload;
  };

  // Bus API start from here
  const getBusSearch = (payload) => {
    return axios({
      method: "POST",
      url: "skyTrails/bus/search",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //Bus API's Start

  const busBlock = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/bus/block",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const busBook = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/bus/book",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const busBookDetails = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/bus/bookingdetails",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const busBookingDataSave = (payload) => {
    const token = sessionStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/api/user/busBooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };

  return {
    userIP,
    markUp,
    userB2CLogin,
    userB2BToken,
    oneWaySearch,
    flightQuoteSearch,
    flightRuleSearch,
    flightGetTicketLcc,
    flightBookGDS,
    flightGetTicketNonLcc,
    hotelSearch,
    hotelSearchInfo,
    hotelRoomInfo,
    hotelBlockRoom,
    hotelBookRoom,
    hotelBookingDetails,
    searchPackage,
    getOnePackage,
    bookingHoliday,
    getBusSearch,
    busBlock,
    busBook,
    busBookDetails,
    busBookingDataSave,
    passengerData,
    hotelBookingDetailsSave,
    flightBookingDataSave,

  };
}

const userApi = api();

export default userApi;