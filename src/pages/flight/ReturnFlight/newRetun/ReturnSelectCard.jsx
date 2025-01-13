import React, { useState } from "react";
import ViewDetails from "./ViewDetails";

const ReturnSelectCard = ({
  item,
  handleSelectedChange,
  key,
  index,
  isOnward,
  selectedIndex,
}) => {
  const type = isOnward ? "onward" : "return";

  const isSelectedIndex = selectedIndex[type] == index;

  const [isFlightDetail, setIsFlightDetail] = useState(false);
  return (
    // <div className="bg-white rounded-sm shadow-md w-full">
    //   <div className="flex justify-between items-center">
    //     <div className="flex gap-2 justify-between">
    //       <div>
    //         <img
    //           src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item.flightName}.png`}
    //           alt="flight"
    //           width={"30px"}
    //           height={"30px"}
    //           style={{ borderRadius: "8px" }}
    //         />
    //         <p>{item.flightName}</p>
    //       </div>
    //       <div>
    //         <p>{item.origin}</p>
    //         <span>{item.departureTime}</span>
    //       </div>
    //       <div>
    //         <p>{item.layover}</p>
    //         <span>{item.stopes}</span>
    //       </div>
    //       <div>
    //         <p>{item?.destination}</p>
    //         <span>{item?.departureTime}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="w-full group bg-white shadow-sm rounded-lg overflow-hidden p-2 hover:shadow-sm cursor-pointer border">
      {/* <!-- Flight Image --> */}

      {/* <!-- Flight Name --> */}

      {/* <!-- Flight Times and Duration --> */}
      <div
        onClick={() => handleSelectedChange(type, item, index)}
        class="flex justify-between mt-4"
      >
        <div>
          <img
            class="w-[30px] h-[30px] object-cover rounded-md"
            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.flightName}.png`}
            alt="Flight Image"
          />
          <div>
            <p class="text-sm text-gray-500">
              {item?.flightName}-{item?.flightNumber}
            </p>
          </div>
        </div>
        {/* <!-- Departure Time --> */}
        <div class="text-center">
          <p class="text-sm text-gray-500">{item?.origin}</p>
          <p class="font-semibold text-gray-700">{item.departureTime}</p>
        </div>

        {/* <!-- Duration and Stops --> */}
        <div class="text-center">
          {/* <p class="text-sm text-gray-500">{item?.destination}</p> */}
          <p class="font-semibold text-gray-700">{item?.layover}</p>
          <div className="w-full h-[1.5px] bg-primary-500 relative">
            {item.stopes !== 0 && (
              <div className="w-2 h-2 rounded-full bg-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            )}
          </div>

          <p class="text-xs text-gray-400">
            {item.stopes == 0 ? "Non-stop" : `${item.stopes}-stop`}
          </p>
        </div>

        {/* <!-- Arrival Time --> */}
        <div class="text-center">
          <p class="text-sm text-gray-500">{item?.destination}</p>
          <p class="font-semibold text-gray-700">{item?.arrivalTime}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <label className="cursor-pointer flex items-center border rounded-lg hover:bg-gray-100 ">
            {/* Hidden Radio Button */}
            <input
              type="radio"
              name="flight-option"
              value={"dd"}
              checked={true}
              // onChange={() => onChange(value)}
              className="hidden peer"
            />

            {/* Custom Radio Button Style */}
            <div
              className={`w-4 h-4 group-hover:border-indigo-600
                transition-property: all
                 ease-in-out delay-150
                 duration-300 
                rounded-full border-2 ${
                  isSelectedIndex
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-400"
                }`}
            ></div>

            {/* Text Label */}
            <div className="text-gray-700">{""}</div>
          </label>
          {/* <p class="text-gray-500 text-sm">Total Price</p> */}
          <p
            class={`text-lg font-semibold ${
              isSelectedIndex ? "text-indigo-600" : "text-gray-700"
            }`}
          >
            ₹{item.price}
          </p>
        </div>
      </div>

      {/* <!-- Flight Route --> */}
      {/* <div class="flex justify-between items-center mt-4">
                     
                      <div class="text-center">
                        <p class="text-sm text-gray-500">From</p>
                        <p class="font-semibold text-gray-700">
                          New York (JFK)
                        </p>
                      </div>

                     
                      <div class="text-center">
                        <p class="text-sm text-gray-500">To</p>
                        <p class="font-semibold text-gray-700">London (LHR)</p>
                      </div>
                    </div> */}

      {/* <!-- Price --> */}
      <div class="flex justify-end items-center mt-2">
        <div>
          {/* <p class="text-gray-500 text-sm">{item?.type}</p> */}
          {/* <p class="text-lg font-semibold text-indigo-600">
                          $450
                        </p> */}
        </div>
        <button
          onClick={() => setIsFlightDetail((pre) => !pre)}
          className="text-indigo-600  hover:text-indigo-700 focus:outline-none text-right"
        >
          Flight Details
        </button>
      </div>
      {isFlightDetail && <ViewDetails key={index} item={item} />}
    </div>
  );
};

export default ReturnSelectCard;
