import * as types from "./hotelActionType";

const initState = {
  ticketData: [],
  hotelInfo: [],
  hotelRoom: [],
  hotelGallery: [],
  bookRoom: [],
  hotelDetails: [],
  isLoading: false,
  isLoadingHotelInfo: false,
  isLoadingHotelRoom: false,
  isLoadingBlockRoom: false,
  isLoadingBookRoom: false,
  isError: false,
  showSuccessMessage: false,
};

export const hotelReducerGRN = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.HOTEL_REQUESTGRN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.HOTEL_SUCCESSGRN:
      return {
        ...state,
        ticketData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    case types.HOTEL_SINGLE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        showSuccessMessage: true,
      }
    case types.HOTEL_SINGLE_SUCCESS:
      return {
        ...state,
        hotelDetails: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      }


    case types.HOTEL_GALLERY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        showSuccessMessage: true,
      }
    case types.HOTEL_GALLERY_SUCCESS:
      return {
        ...state,
        hotelGallery: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      }



    case types.HOTEL_ROOMSELECT_REQUEST:
      return {
        ...state,
        isLoadingHotelRoom: true,
        isError: false,
      };

    case types.HOTEL_ROOMSELECT_SUCCESS:
      return {
        ...state,
        hotelRoom: payload?.data?.data,
        isLoadingHotelRoom: false,
        isError: false,
        showSuccessMessage: true,
      };




    case types.HOTEL_B0OKROOM_REQUESTGRN:
      return {
        ...state,
        isLoadingBookRoom: true,
        isError: false,
      };

    case types.HOTEL_B0OKROOM_SUCCESSGRN:
      return {
        ...state,
        bookRoom: payload?.data?.data,
        isLoadingBookRoom: false,
        isError: false,
        showSuccessMessage: true,
      };


    case types.CLEAR_HOTEL_BLOCK_ROOM:
      return {
        ...state,
        blockRoom: [],
      }
    case types.CLEAR_HOTEL_REDUCER:
      return {
        ticketData: [],
        hotelInfo: [],
        hotelRoom: [],
        hotelGallery: [],
        bookRoom: [],
        hotelDetails: [],
        isLoading: false,
        isLoadingHotelInfo: false,
        isLoadingHotelRoom: false,
        isLoadingBlockRoom: false,
        isLoadingBookRoom: false,
        isError: false,
        showSuccessMessage: false,
      }

    default:
      return state;
  }
};
