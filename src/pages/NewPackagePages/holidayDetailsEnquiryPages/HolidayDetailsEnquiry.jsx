import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchOnePackageAction } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import "./holidaydetailsEnquiry.scss";
import Img from "../../../LazyLoading/Img";
import "./hoteldetailsenquiry.css";
import HolidayDetailsBottomDetails from "./HolidayDetailsBottomDetails";
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
} from "./../inclusionsSVG";
import HolidayEnquirySkeleton from "./HolidayEnquirySkeleton";
import HolidayEnquiryForm from "./HolidayEnquiryForm";
import { Tooltip } from "antd";
import { Modal } from "antd";
const HolidayDetailsEnquiry = () => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const [loading, setLoading] = useState(true);
  const onePackage =
    reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data;

  console.log(onePackage, "packagessss");
  const { id } = useParams();
  useEffect(() => {
    const payload = {
      id,
    };
    dispatch(searchOnePackageAction(payload));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [reducerState?.searchOneResult?.OneSearchPackageResult?.data?.data]);

  if (loading) {
    return (
      <div>
        <HolidayEnquirySkeleton />{" "}
      </div>
    );
  }
  const MAX_INCLUSIONS_TO_SHOW = 7;

  // console.log(reducerState, "reducer state")

  return (
    <section className="pt-4">
      <div className="container ">
        <div className="row">
          <div className="col-lg-6">
            <div className="packCardImg h-[370px] rounded-lg">
              <img
                className="w-full h-full"
                src={onePackage?.pakage_img || onePackage?.package_img?.[0]}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="HDEright">
              <div className="HDEtitle">{onePackage?.pakage_title}</div>

              {/* <div className="overview">
                                <div className="heading">
                                    Overview
                                </div>
                                <div className="description" dangerouslySetInnerHTML={{ __html: onePackage?.overview }}>
                                </div>
                            </div> */}

              <div className="HDEinfo2">
                <div className="HDEinfoItem">
                  <span className="HDEtext HDEbold">Price: </span>
                  <span className="HDEtext">
                    {onePackage?.pakage_amount?.amount}/Person
                  </span>
                </div>

                <div className="HDEinfoItem">
                  <span className="HDEtext HDEbold">No of Days: </span>
                  <span className="HDEtext">
                    {onePackage?.days}D/{onePackage?.days - 1}N
                  </span>
                </div>
              </div>

              {/* <div className="inclusionMainBox">
                <div className="inclusionIcons">
                  {onePackage?.insclusions?.map((ele, index) => {
                    if (
                      ele?.flexibility ||
                      ele?.train ||
                      ele?.bus ||
                      ele?.cab ||
                      ele?.moterBike ||
                      ele?.hotel ||
                      ele?.homeStays ||
                      ele?.guestHouse ||
                      ele?.cruise ||
                      ele?.sightSeeing ||
                      ele?.guide ||
                      ele?.meals ||
                      ele?.breakfast ||
                      ele?.drink ||
                      ele?.visa ||
                      ele?.travelInsurance ||
                      ele?.wildlife ||
                      ele?.heritage ||
                      ele?.adventure ||
                      ele?.beach ||
                      ele?.hillStation ||
                      ele?.nature ||
                      ele?.wellness ||
                      ele?.hiddenGem ||
                      ele?.tax ||
                      ele?.discount ||
                      ele?.waterActivities ||
                      ele?.optionalActivities ||
                      ele?.flexibleBooking ||
                      ele?.wifi ||
                      ele.flight
                    ) {
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
                    }
                  })}
                </div>
              </div> */}

              <div className="inclusionMainBox">
                <div className="inclusionIcons">
                  {onePackage?.insclusions
                    ?.slice(0, MAX_INCLUSIONS_TO_SHOW)
                    .map((ele, index) => (
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
                    ))}

                  <span className="seeMore" onClick={handleOpenModal}>
                    See More
                  </span>
                </div>
                <Modal
                  visible={isModalVisible}
                  onCancel={handleCloseModal}
                  footer={
                    <div className="flex items-center justify-center">
                      <button
                        className="px-4 py-2 text-white bg-red-600 border-none rounded cursor-pointer"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  }
                  width={570}
                >
                  <div className="grid grid-cols-4 gap-2 items-center justify-center border border-gray-300 rounded-lg w-[510px] overflow-y-auto p-2 bg-white">
                    {onePackage?.insclusions
                      .slice(MAX_INCLUSIONS_TO_SHOW)
                      .map((ele, index) => {
                        const inclusions = [
                          {
                            key: ele?.flight,
                            icon: airplane,
                            label: "Flight",
                          },
                          {
                            key: ele?.flexibility,
                            icon: flexible,
                            label: "Flexibility",
                          },
                          { key: ele?.train, icon: train, label: "Train" },
                          { key: ele?.bus, icon: bus, label: "Bus" },
                          { key: ele?.cab, icon: cab, label: "Cab" },
                          {
                            key: ele?.moterBike,
                            icon: motorbike,
                            label: "Motorbike",
                          },
                          { key: ele?.hotel, icon: hotel, label: "Hotel" },
                          {
                            key: ele?.homeStays,
                            icon: homestay,
                            label: "Homestays",
                          },
                          {
                            key: ele?.guestHouse,
                            icon: guestbooking,
                            label: "Guesthouse",
                          },
                          { key: ele?.camp, icon: "", label: "Camp" },
                          {
                            key: ele?.cruise,
                            icon: crusine,
                            label: "Cruise",
                          },
                          {
                            key: ele?.sightSeeing,
                            icon: binocular,
                            label: "Sightseeing",
                          },
                          {
                            key: ele?.guide,
                            icon: travelagent,
                            label: "Guide",
                          },
                          { key: ele?.meals, icon: meal, label: "Meals" },
                          {
                            key: ele?.breakfast,
                            icon: breakfasrt,
                            label: "Breakfast",
                          },
                          {
                            key: ele?.drink,
                            icon: cocktail,
                            label: "Drink",
                          },
                          { key: ele?.visa, icon: visa, label: "Visa" },
                          {
                            key: ele?.travelInsurance,
                            icon: travelinsurance,
                            label: "Travel Insurance",
                          },
                          {
                            key: ele?.safeTravel,
                            icon: safetravel,
                            label: "Safe to Travel",
                          },
                          {
                            key: ele?.wildlife,
                            icon: wildlife,
                            label: "Wildlife",
                          },
                          {
                            key: ele?.heritage,
                            icon: heriatge,
                            label: "Heritage",
                          },
                          {
                            key: ele?.adventure,
                            icon: adventure,
                            label: "Adventure",
                          },
                          {
                            key: ele?.beach,
                            icon: beachChiar,
                            label: "Beach",
                          },
                          {
                            key: ele?.hillStation,
                            icon: hillStation,
                            label: "Hill Station",
                          },
                          {
                            key: ele?.nature,
                            icon: nature,
                            label: "Nature",
                          },
                          {
                            key: ele?.wellness,
                            icon: wellness,
                            label: "Wellness",
                          },
                          {
                            key: ele?.hiddenGem,
                            icon: hiddengem,
                            label: "Hidden Gem",
                          },
                          { key: ele?.tax, icon: tax, label: "Tax" },
                          {
                            key: ele?.discount,
                            icon: discount,
                            label: "50% Off",
                          },
                          {
                            key: ele?.waterActivities,
                            icon: wateractivites,
                            label: "Water Activities",
                          },
                          {
                            key: ele?.optionalActivities,
                            icon: otheractivity,
                            label: "Optional Activities",
                          },
                          {
                            key: ele?.flexibleBooking,
                            icon: flexible,
                            label: "Flexible Booking",
                          },
                          { key: ele?.wifi, icon: wifi, label: "WIFI" },
                        ];

                        // Render only items with valid keys
                        return inclusions
                          .filter(({ key }) => key)
                          .map(({ icon, label }, subIndex) => (
                            <div
                              key={`${index}-${subIndex}`}
                              style={{
                                width: "100px",
                                height: "68px",
                                display: "flex", // Enable flexbox
                                flexDirection: "column", // Stack items vertically
                                justifyContent: "center", // Center items vertically
                                alignItems: "center", // Center items horizontally
                                textAlign: "center", // Center text alignment
                              }}
                            >
                              <span style={{ marginBottom: "4px" }}>
                                {icon}
                              </span>{" "}
                              {/* Icon */}
                              <p style={{ textAlign: "center", margin: 0 }}>
                                {label}
                              </p>{" "}
                              {/* Label */}
                            </div>
                          ));
                      })}
                  </div>
                </Modal>
              </div>

              <div className="HDEinfo">
                <span className="HDEtext HDEbold">Destinations: </span>
                <span className="HDEtext">
                  {onePackage?.destination?.map((d, i) => (
                    <span key={i}>
                      {d.addMore}
                      {onePackage?.destination.length - 1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                  }}
                >
                  {onePackage?.package_img?.slice(1, 5).map((imgSrc, index) => (
                    <div key={index} className="h-[106px]">
                      <Img
                        src={imgSrc}
                        className="object-cover w-full h-[106px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 row">
          <div className="col-lg-8">
            <HolidayDetailsBottomDetails packageData={onePackage} />
          </div>
          <div className="col-lg-4">
            <HolidayEnquiryForm onePackage={onePackage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidayDetailsEnquiry;
