import * as types from "./hotelActionType";

const initState = {
  ticketData: [],
  hotelInfo: [],
  hotelRoom: [],
  hotelGallery: [],
  bookRoom: [],
  hotelDetails: [],
  onlyHotels: [],
  isLoading: false,
  isLoadingHotelInfo: false,
  isLoadingHotelRoom: false,
  isLoadingBlockRoom: false,
  isLoadingBookRoom: false,
  isError: false,
  showSuccessMessage: false,
  hasMore: true
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
      // let oldHotels = [...state?.onlyHotels]
      // oldHotels.concat(payload?.data?.data?.hotels)


      if (payload?.data?.data?.hotels) {
        const search_id = payload?.data?.data?.search_id;
        const updatedHotels = payload?.data?.data?.hotels.map(hotel => ({
          ...hotel,
          search_id
        }));
        let olddata = [...state?.onlyHotels, ...updatedHotels]
        return {
          ...state,
          ticketData: payload,
          onlyHotels: olddata,
          isLoading: false,
          isError: false,
          showSuccessMessage: true,
          hasMore: true,
        };
      }
      else if (payload?.data?.data?.errors) {

        return {
          ...state,
          hasMore: false,
          isLoading: false,
          isError: false,
          showSuccessMessage: true,
        }

      }
      else {
        return { ...state }
      }




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

    case types.CLEAR_ONLYHOTEL_GRN:
      return {
        onlyHotels: [],
      }
    case types.CLEAR_HOTEL_REDUCER_GRN:
      return {
        ticketData: [],
        hotelInfo: [],
        hotelRoom: [],
        hotelGallery: [],
        bookRoom: [],
        onlyHotels: [],
        hotelDetails: [],
        isLoading: false,
        isLoadingHotelInfo: false,
        isLoadingHotelRoom: false,
        isLoadingBlockRoom: false,
        isLoadingBookRoom: false,
        isError: false,
        showSuccessMessage: false,
        initState: false
      }
    case types.CLEAR_HOTEL_ROOMGALLERY_GRN:
      return {
        ...state,
        hotelGallery: [],
        hotelDetails: [],

      }

    case types.CLEAR_HOTEL_ROOM_SELECT:
      return {
        ...state,
        hotelRoom: [],
      }

    default:
      return state;
  }
};
