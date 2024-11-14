import React from "react";
import Img from "../../../LazyLoading/Img";
import "./packageresultCards.scss";
import {
  adventure,
  beachChiar,
  binocular,
  breakfasrt,
  bus,
  cab,
  cocktail,
  crusine,
  discount,
  flexible,
  guestbooking,
  heriatge,
  hiddengem,
  hillStation,
  homestay,
  hotel,
  meal,
  motorbike,
  nature,
  otheractivity,
  safetravel,
  tax,
  train,
  travelagent,
  travelinsurance,
  visa,
  wateractivites,
  wellness,
  wifi,
  wildlife,
  airplane,
} from "../inclusionsSVG";
import { useNavigate } from "react-router-dom";
import { PiAirplaneTakeoffLight } from "react-icons/pi";

const PackageResultCards = ({ data }) => {
  const navigate = useNavigate();

  const searchOneHoliday = (id) => {
    navigate(`/holidaypackages/packagedetails/${id}`);
  };

  const sortedInclusions = data?.insclusions?.sort((a, b) => {
    const aValue = Object?.values(a)[0];
    const bValue = Object?.values(b)[0];
    return (
      (bValue === "true" || bValue === true) -
      (aValue === "true" || aValue === true)
    );
  });

  // console.log(data, "datapackagesss pakageanme");

  return (
    <div key={data?._id} className="packageCard">
      <div className="packCardImg">
        <Img
          className="posterImg"
          src={data?.pakage_img || data?.package_img[0]}
        />
        {sortedInclusions?.some((ele) => ele?.flight) && (
          <div className="smallOverlayCard">
            <p style={{ fontSize: "20px" }}>
              <PiAirplaneTakeoffLight />
            </p>
            <p>Flights Included</p>
          </div>
        )}
      </div>
      <div className="packCardContent">
        <div className="packCardTitle">
          <h2>{data?.pakage_title}</h2>
          <p>
            {data?.days}D/{Number(data?.days) - 1}N
          </p>
        </div>

        <div className="packCardInclusions">
          <p>Inclusion Highlights</p>

          <div className="inclusionMainBox">
            <div className="inclusionIcons">
              {sortedInclusions?.slice(0, 4)?.map((ele, index) => {
                return (
                  <div key={index} className="">
                    {ele?.flight && (
                      <div>
                        <span>{airplane}</span>
                        <p>Flight</p>
                      </div>
                    )}
                    {ele?.flexibility && (
                      <div>
                        <span>{flexible}</span>
                        <p>Flexibility</p>
                      </div>
                    )}
                    {ele?.train && (
                      <div>
                        <span>{train}</span>
                        <p>Train</p>
                      </div>
                    )}
                    {ele?.bus && (
                      <div>
                        <span>{bus}</span>
                        <p>Bus</p>
                      </div>
                    )}
                    {ele?.cab && (
                      <div>
                        <span>{cab}</span>
                        <p>Cab</p>
                      </div>
                    )}
                    {ele?.moterBike && (
                      <div>
                        <span>{motorbike}</span>
                        <p>Moterbike</p>
                      </div>
                    )}
                    {ele?.hotel && (
                      <div>
                        <span>{hotel}</span>
                        <p>Hotel</p>
                      </div>
                    )}
                    {ele?.homeStays && (
                      <div>
                        <span>{homestay}</span>
                        <p>Homestays</p>
                      </div>
                    )}
                    {ele?.guestHouse && (
                      <div>
                        <span>{guestbooking}</span>
                        <p>Guesthouse</p>
                      </div>
                    )}
                    {ele?.camp && (
                      <div>
                        <span></span>
                        <p>Camp</p>
                      </div>
                    )}
                    {ele?.cruise && (
                      <div>
                        <span>{crusine}</span>
                        <p>Cruise</p>
                      </div>
                    )}
                    {ele?.sightSeeing && (
                      <div>
                        <span>{binocular}</span>
                        <p>Sightseeing</p>
                      </div>
                    )}
                    {ele?.guide && (
                      <div>
                        <span>{travelagent}</span>
                        <p>Guide</p>
                      </div>
                    )}
                    {ele?.meals && (
                      <div>
                        <span>{meal}</span>
                        <p>Meals</p>
                      </div>
                    )}
                    {ele?.breakfast && (
                      <div>
                        <span>{breakfasrt}</span>
                        <p>Breakfast</p>
                      </div>
                    )}
                    {ele?.drink && (
                      <div>
                        <span>{cocktail}</span>
                        <p>Drink</p>
                      </div>
                    )}
                    {ele?.visa && (
                      <div>
                        <span>{visa}</span>
                        <p>Visa</p>
                      </div>
                    )}
                    {ele?.travelInsurance && (
                      <div>
                        <span>{travelinsurance}</span>
                        <p>Travel Insurance</p>
                      </div>
                    )}
                    {ele?.safeTravel && (
                      <div>
                        <span>{safetravel}</span>
                        <p>Safe to Travel</p>
                      </div>
                    )}
                    {ele?.wildlife && (
                      <div>
                        <span>{wildlife}</span>
                        <p>Wildlife</p>
                      </div>
                    )}
                    {ele?.heritage && (
                      <div>
                        <span>{heriatge}</span>
                        <p>Heritage</p>
                      </div>
                    )}
                    {ele?.adventure && (
                      <div>
                        <span>{adventure}</span>
                        <p>Adventure</p>
                      </div>
                    )}
                    {ele?.beach && (
                      <div>
                        <span>{beachChiar}</span>
                        <p>Beach</p>
                      </div>
                    )}
                    {ele?.hillStation && (
                      <div>
                        <span>{hillStation}</span>
                        <p>Hill Station</p>
                      </div>
                    )}
                    {ele?.nature && (
                      <div>
                        <span>{nature}</span>
                        <p>Nature</p>
                      </div>
                    )}
                    {ele?.wellness && (
                      <div>
                        <span>{wellness}</span>
                        <p>Wellness</p>
                      </div>
                    )}
                    {ele?.hiddenGem && (
                      <div>
                        <span>{hiddengem}</span>
                        <p>Hidden Gem</p>
                      </div>
                    )}
                    {ele?.tax && (
                      <div>
                        <span>{tax}</span>
                        <p>Tax</p>
                      </div>
                    )}
                    {ele?.discount && (
                      <div>
                        <span>{discount}</span>
                        <p>50% Off</p>
                      </div>
                    )}
                    {ele?.waterActivities && (
                      <div>
                        <span>{wateractivites}</span>
                        <p>Water Activities</p>
                      </div>
                    )}
                    {ele?.optionalActivities && (
                      <div>
                        <span>{otheractivity}</span>
                        <p>Optional Activities</p>
                      </div>
                    )}
                    {ele?.flexibleBooking && (
                      <div>
                        <span>{flexible}</span>
                        <p>Flexible Booking</p>
                      </div>
                    )}
                    {ele?.wifi && (
                      <div>
                        <span>{wifi}</span>
                        <p>WIFI</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <h6>+{data?.insclusions.length - 4} more </h6>
          </div>
        </div>

        {/* <div className="destinationMainBox">
                    {data?.destination?.map((destinationItem, index) => (
                        <p key={index}>{destinationItem?.addMore}</p>
                    ))}
                </div> */}

        <div className="packCardPrice">
          <div className="flex items-center justify-start gap-2">
            <span className="text-sm text-nowrap">Starts from </span>{" "}
            <h2 className="text-lg">₹ {data.pakage_amount.amount}</h2>
          </div>
          <button onClick={(e) => searchOneHoliday(data?._id)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageResultCards;

// < div key = { data._id } >
//         <h2>{data.pakage_title}</h2>
//         <img
//             src={data.pakage_img}
//             style={{ width: "200px" }}
//             alt={data.pakage_title}
//         />
//         <span>
//             {data.destination.map((destinationItem, index) => (
//                 <span key={index}>{destinationItem.addMore}, </span>
//             ))}
//         </span>
//         <p>{data.country}</p>
//         <p>{data.days} days</p>
//         <p>
//             {data.pakage_amount.currency} {data.pakage_amount.amount}
//         </p>
//         <div>
//             <h4>Tags:</h4>
//             <ul>
//                 {data.select_tags.map((tag, index) => (
//                     <li key={index}>
//                         {Object.keys(tag)
//                             .filter((key) => tag[key])
//                             .map((key) => key)
//                             .join(", ")}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     </ >
