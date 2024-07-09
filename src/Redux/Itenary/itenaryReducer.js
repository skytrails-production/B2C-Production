import * as types from "./itenaryActionType";

const initState = {
    itenaryPayload: [],
    itenararyResult: [],
    flightfromData: [],
    flighttoData: [],
    selectedFlight: [],
    selectedHotel: [],
    selectedActivities: [],
    hotelResultArray: [],
    isLoading: false,
};



export const itenaryReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SAVE_PAYLOAD_REQUEST:
            return {
                ...state,
                isLoading: false,

            };
        case types.SAVE_PAYLOAD_SUCCESS:
            return {
                ...state,
                itenaryPayload: payload,
                isLoading: false,

            };


        case types.ITENERARY_SEARCH_REQUEST:

            return {
                ...state,
                isLoading: false,

            };
        case types.ITENERARY_SEARCH_SUCCESS:
            let iteResult = [...state.itenararyResult]
            iteResult.push(payload)
            return {
                ...state,
                itenararyResult: iteResult,
                isLoading: false,

            };



        case types.HOTEL_ITENERARY_REQUEST:
            return {
                ...state,
                isLoading: true,

            };

        case types.HOTEL_ITENERARY_SUCCESS:
            console.log(payload, "payload red")
            let hotel_array = [...state.hotelResultArray]
            hotel_array.push(payload)
            console.log(hotel_array, "hotelarray")

            return {
                ...state,
                hotelResultArray: hotel_array,
                isLoading: false,
            };



        case types.FLIGHT_FROM_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case types.FLIGHT_FROM_SUCCESS:
            return {
                ...state,
                flightfromData: payload,
                isLoading: false,
            };


        case types.FLIGHT_TO_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case types.FLIGHT_TO_SUCCESS:
            return {
                ...state,
                flighttoData: payload,
                isLoading: false,
            };


        case types.SELECTED_FLIGHT_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case types.SELECTED_FLIGHT_SUCCESS:
            return {
                ...state,
                selectedFlight: payload,
                isLoading: false,
            };



        case types.SELECTED_HOTEL_ROOM_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case types.SELECTED_HOTEL_ROOM_SUCCESS:
            return {
                ...state,
                selectedHotel: payload,
                isLoading: false,
            };


        case types.SELECTED_ACTIVITY_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case types.SELECTED_ACTIVITY_SUCCESS:
            return {
                ...state,
                selectedActivities: payload,
                isLoading: false,
            };

        case types.CLEAR_FLIGHT_REDUCER:
            return {
                ...state,
                selectedFlight: []
            }
        case types.CLEAR_ITENARY_DATA:
            return {
                ...state,
                itenaryPayload: [],
                itenararyResult: [],
                flightfromData: [],
                flighttoData: [],
                selectedFlight: [],
                selectedHotel: [],
                selectedActivities: [],
                hotelResultArray: [],
            }

        default:
            return state;
    }
};