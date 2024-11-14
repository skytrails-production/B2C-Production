import axios from "axios";
import { apiURL } from "../../Constants/constant";
import SecureStorage from 'react-secure-storage';
import secureLocalStorage from "react-secure-storage";

function api() {
  const userIP = (formData) => {
    return axios.get("https://api.ipify.org?format=json");
  };

  const markUp = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/api/admin/getMarkup`);
  };
  const flightList = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/airline`);
  };
  const airportList = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/searchCity`);
  };
  const faqReviewApi = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/api/user/getFaqRating`);
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
    const token = SecureStorage.getItem("jwtToken");
    // console.log("jwt token", token);
    return axios({
      method: "PUT",
      url: "/skytrails/api/user/verifyUserOtp1",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };


  const profilePicUpdate = (payload) => {
    // console.log("payload", payload);
    const token = SecureStorage.getItem("jwtToken");
    // console.log("jwt token", token);
    return axios({
      method: "PUT",
      url: "/skytrails/api/user/uploadImage",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });
  };
  const profileDataUpdate = (payload) => {
    // console.log("payload", payload);
    const token = SecureStorage.getItem("jwtToken");
    // console.log("jwt token", token);
    return axios({
      method: "PUT",
      url: "/skytrails/api/user/editProfile",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };

  const userB2CLoginWithSocial = (payload) => {
    console.log("chal gye ")
    return axios({
      method: "POST",
      url: "/skyTrails/api/user/socialLogin",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };








  // const loginUserData = () => {
  //   const token = SecureStorage.getItem("jwtToken");
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
      // url: "/skytrails/api/combined/combineTVOAMADEUSPriceSort",
      url: "/skytrails/api/combined/AMADEUSPriceSort",


      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const oneWaySearchCombined = (payload) => {
    return axios({
      method: "POST",
      // url: "/skytrails/api/combined/combineTVOAMADEUSPriceSort",
      url: "/skyTrails/api/combine/combineApiRes",
      // url: "/skytrails/api/combined/AMADEUSPriceSort",


      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const flightBookingDB = (payload) => {
    const token = SecureStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/api/amadeus/user/flightBooking",

      // url: "/skyTrails/flight/search/oneway",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
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
    const token = SecureStorage?.getItem("jwtToken");
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


  // return flight api

  const returnSearch = async (payload) => {
    // console.log({ payload, emtPayload });
    return axios({
      method: "POST",
      url: "/skyTrails/flight/search/return",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const flightGetTicketLccReturn = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/getticketlcc",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };



  // multicity flight api

  const multicitySearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/search/multicity",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  // multicity flight api 


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
    const token = secureLocalStorage?.getItem("jwtToken");
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

    return axios.get(
      `${apiURL.baseURL}/skyTrails/international/getAll?keyword=${payload}`
    );
  };


  const searchPackageCategory = (payload) => {

    return axios.get(
      `${apiURL.baseURL}/skyTrails/api/packages/packagesCategory?seeAll=true&keyword=${payload}`

    );
  };

  const searchPackageCountry = (payload) => {

    return axios.get(
      `${apiURL.baseURL}/skyTrails/domesticAndInternationalPackages?country=${payload}`

    );
  };

  const searchPackageBudget = (payload) => {

    return axios.get(
      `${apiURL.baseURL}/skyTrails/package/packagefilterAmount?amount=${payload}`

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
    const token = SecureStorage?.getItem("jwtToken");
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



 
  // new hotel grn api's

  const hotelSearchGRN = (payload) => {

    return axios({
      method: "POST",
      url: `/skyTrails/grnconnect/searchmultihotel`,
      baseURL: `${apiURL.baseURL}`,
      data: payload.data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };





  const hotelsingleDataGRN = (payload) => {
    // console.log("key")
    // const { data } = payload;
    const searchId = payload.searchID;
    return axios({
      method: "POST",
      url: `/skyTrails/grnconnect/rateRefetchHotel?searchId=${searchId}`,
      baseURL: `${apiURL.baseURL}`,
      data: payload.data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // book room  

  const hotelBookRoomGRN = (payload) => {
    // console.log("key")
    const { data } = payload;
    const searchId = payload.searchID;
    const hcode = payload.hotel_code;
    return axios({
      method: "GET",
      // url: `/skyTrails/grnconnect/rateRefetchHotel?searchId=${searchId}`,
      url: `/skyTrails/grnconnect/refetchHotel?searchId=${searchId}&hcode=${hcode}`,
      baseURL: `${apiURL.baseURL}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  const hotelGalleryGRN = (payload) => {
    // console.log("key")
    const hotel_id = payload.hotel_id;
    return axios({
      method: "GET",
      url: `/skyTrails/grnconnect/hotelimages?hotelCode=${hotel_id}`,
      baseURL: `${apiURL.baseURL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookingGRN = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/grnconnect/hotelbooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  const hotelBookingDetailsSaveGRN = (payload) => {
    const token = secureLocalStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/api/grn/user/grnBookig",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  }

  // new hotel grn api's



  // fetch tnpl 



  const fetchTNPL = () => {
    return axios.get(
      `${apiURL.baseURL}/skyTrails/mihuru/partnerauthentication`
    );
  };


  const tnplUserData = (payload) => {
    // console.log("Passenger payload", payload);
    return payload;
  };

  const tnplOTPVerified = (payload) => {
    // console.log("Passenger payload", payload);
    return payload;
  };

  const tnplPlanGenerator = (payload) => {
    // console.log("Passenger payload", payload);
    return payload;
  };





  // itenerary api's 

  const iteneraryPayloadData = (payload) => {
    // console.log("Passenger payload", payload);
    return payload;
  };



  const hotelSearchforItenerary = (payload) => {
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

  const itenerarySearch = (payload) => {

    const { origin, destination, noOfDays } = payload
    return axios({
      method: "GET",
      url: `/skyTrails/api/itinerary/dayWise/getAllCItyWiseItinerary?origin=${origin}&&destination=${destination}&&noOfDays=${noOfDays}`,
      baseURL: `${apiURL.baseURL}`,
      // data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };



  // const hotelSelectedRoom = (payload) => {
  //   return axios({
  //     method: "POST",
  //     url: "skyTrails/hotel/room",
  //     baseURL: `${apiURL.baseURL}`,
  //     data: payload,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };
  const hotelSelectedRoom = (payload) => {
    return payload;
  };



  const savehotelRoominItenerary = (payload) => {
    return payload;
  };


  const flightFromData = (payload) => {
    return payload;
  };

  const flightToData = (payload) => {
    return payload;
  };


  const handleFlightDomestic = (payload) => {
    return payload;
  };

  const handleFlightInternational = (payload) => {
    return payload;
  };


  const handleItenaryActivitySelection = (payload) => {
    return payload;
  };


  // onewayflight 

  const IterneraryOneWaySearch = (payload) => {
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

  // onewayflight 

  // itenerary api's 


  //inventoryAuth 

  const InventoryAuth = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/api/inventory/partnerLogin",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const submitReview = (payload) => {
    const token = secureLocalStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/api/user/rating/rateOurApp",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token

      }
    })
  }

  return {
    userIP,
    markUp,
    userB2CLogin,
    profileDataUpdate,
    profilePicUpdate,
    faqReviewApi,
    userB2CLoginWithSocial,
    userB2BToken,
    oneWaySearch,
    oneWaySearchCombined,
    flightQuoteSearch,
    flightRuleSearch,
    flightGetTicketLcc,
    flightBookGDS,
    flightGetTicketNonLcc,
    returnSearch,
    multicitySearch,
    flightGetTicketLccReturn,
    hotelSearch,
    hotelSearchGRN,
    hotelsingleDataGRN,
    hotelBookRoomGRN,
    hotelGalleryGRN,
    hotelBookingGRN,
    hotelBookingDetailsSaveGRN,
    hotelSearchInfo,
    hotelRoomInfo,
    hotelBlockRoom,
    hotelBookRoom,
    hotelBookingDetails,
    searchPackage,
    searchPackageCategory,
    searchPackageCountry,
    searchPackageBudget,
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
    fetchTNPL,
    tnplUserData,
    tnplOTPVerified,
    tnplPlanGenerator,
    flightBookingDB,
    flightList, airportList,

    iteneraryPayloadData,
    itenerarySearch,
    flightFromData,
    flightToData,
    handleFlightDomestic,
    handleFlightInternational,
    savehotelRoominItenerary,
    handleItenaryActivitySelection,
    hotelSearchforItenerary,

    hotelSelectedRoom,
    IterneraryOneWaySearch,
    submitReview

  };
}

const userApi = api();

export default userApi;
