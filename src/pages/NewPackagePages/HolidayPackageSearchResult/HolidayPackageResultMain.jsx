import React, { useState, useEffect } from "react";
import PackageResultFilter from "./PackageResultFilter";
import HolidayResult from "./HolidayResult";
import "./holidayResult.scss";
import { useNavigate, useParams } from "react-router-dom";
import { apiURL } from "../../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import {
  searchPackageAction,
  searchPackageActionBudget,
  searchPackageActionCategory,
  searchPackageActionTopCountries,
} from "../../../Redux/SearchPackage/actionSearchPackage";
import PackageResultFilterMobile from "./PackageResultFilterMobile";
import HolidayResultSkeleton from "./holidayresultSkeletonPage/HolidayResultSkeleton";
import { clearHolidayReducer } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Skeleton } from "@mui/material";

const HolidayPackageResultMain = () => {
  const reducerState = useSelector((state) => state);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedTag, setSelectedTag] = useState(null);

  const [flightOption, setFlightOption] = useState({
    includeFlight: true,
    notIncludeFlight: true,
  });
  const [flightOption1, setFlightOption1] = useState([]);

  const [selectedDays, setSelectedDays] = useState([]);
  const [packageData, setPackagedata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooManyFilter, setToomanyFilter] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const { keyword, type } = useParams();
  const dispatch = useDispatch();
  const notify = () => {
    toast(" Explore More Europe Packages", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      onClick: () => {
        // Redirect to the specified URL
        window.location.href =
          "https://www.europamundo.com/eng/embed/multisearch.aspx?opeIP=499&ageKEY=44890%27";
      },
    });
    setShowToast(true); // Set state to show the toast
  };

  // useEffect(() => {
  //   if (keyword === "Europe") {
  //     const timer = setTimeout(() => {
  //       notify(); // Trigger the notification after 4 seconds
  //     }, 4000);

  //     // Cleanup function to clear the timer on component unmount or keyword change
  //     return () => clearTimeout(timer);
  //   }
  // }, [keyword]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/package/getPackageCityData?keyword=${keyword}`
      );
      const result = await response.json();
      console.log(result, "resultsss");
      setData(result?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    // Page load par initially saare packages show karna hain
    handleFilterChange();
  }, [flightOption1]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(clearHolidayReducer());
  }, []);

  useEffect(() => {
    if (type == "cities") {
      dispatch(searchPackageAction(keyword));
    }
    if (type == "category") {
      dispatch(searchPackageActionCategory(keyword));
    }
    if (type == "country") {
      dispatch(searchPackageActionTopCountries(keyword));
    }
    if (type == "budget") {
      dispatch(searchPackageActionBudget(keyword));
    }
    sessionStorage.setItem("searchPackageData", JSON.stringify(keyword));
  }, [dispatch, keyword, type]);

  const Package =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage ||
    reducerState?.searchResult?.packageSearchResult?.data?.results ||
    reducerState?.searchResult?.packageSearchResult?.data?.data ||
    [];

  useEffect(() => {
    if (Package.length > 0) {
      setLoading(false);
    }
  }, [Package]);

  const uniqueDestinations =
    Package?.length > 0
      ? [
          ...new Set(
            Package?.flatMap((pkg) =>
              pkg?.destination?.map((dest) => dest?.addMore)
            )
          ),
        ]
      : [];

  const handleFilterChange = (
    selectedDestinations,
    priceRange,
    tag,
    includeFlight,
    days
  ) => {
    let filtered = Package;
     console.log(filtered, "filteredddd");

    if (selectedDestinations?.length > 0) {
      filtered = filtered?.filter((pkg) =>
        selectedDestinations.every((dest) =>
          pkg?.destination?.some((d) => d.addMore === dest)
        )
      );
    }

    if (tag) {
      filtered = filtered?.filter((pkg) =>
        pkg?.select_tags?.some((t) => t[tag] === true)
      );
    }

    console.log(flightOption1,flightOption1?.length,"flightOption1")
    if (flightOption1?.length > 0) {
      filtered = filtered?.filter((pkg) => {
        const inclusions = pkg?.insclusions;
        
        
        const hasFlight = inclusions?.some((inclusion) =>
          Object.keys(inclusion).includes("flight")
      );
      
      const hasFlterFlight = flightOption1.includes("flight");
      const hasNotFlterFlight = flightOption1.includes("not-included");
      console.log("flightOption!11","hasFlterFlight",hasFlterFlight,"hasNotFlterFlight",hasNotFlterFlight,"hasFlight",hasFlight,flightOption1)
console.log("ressss",(hasFlight && hasFlterFlight) || (hasNotFlterFlight && !hasFlight))
        return (
          (hasFlight && hasFlterFlight) || (hasNotFlterFlight && !hasFlight)
        );

        // return includeFlight.includes(true)? hasFlight :!hasFlight || true;
        // return true;
      });
      console.log("inclidefflitred",filtered)
    }

    // Flight filter: apply only if user has chosen a specific option
    // if (isFilterApplied && Array.isArray(filtered)) {
    //   filtered = filtered?.filter((pkg) => {
    //     const hasFlight = pkg?.insclusions.some((inclusion) =>
    //       Object.keys(inclusion).includes("flight")
    //     );
    //     if (flightOption?.includeFlight && flightOption?.notIncludeFlight) {
    //       return true; // Show all if both options are selected
    //     }
    //     return flightOption?.includeFlight ? hasFlight : !hasFlight;
    //   });
    // }

    if (days?.length > 0) {
      filtered = filtered?.filter((pkg) => {
        const daysInRange = days?.some((range) => {
          switch (range) {
            case "0-5":
              return pkg?.days >= 0 && pkg?.days <= 5;
            case "5-7":
              return pkg?.days >= 5 && pkg?.days <= 7;
            case "7-10":
              return pkg?.days >= 7 && pkg?.days <= 10;
            case "10+":
              return pkg?.days >= 10;
            default:
              return false;
          }
        });
        return daysInRange;
      });
    }

    setIsFilterApplied(true);

    setPackagedata(filtered);
  };

  const getMinMaxPrices = (Pack) => {
    if (!Pack || Pack.length === 0) {
      return { min: 0, max: 0 };
    }

    const validPackage = Pack?.filter(
      (pkg) => pkg && pkg?.pakage_amount?.amount
    );

    if (validPackage.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = validPackage?.map((pkg) => pkg.pakage_amount.amount);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  const { min, max } = getMinMaxPrices(Package);

  useEffect(() => {
    setPriceRange([min, max]);
  }, [min, max]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleTagChange = (value) => {
    setSelectedTag(value);
  };

  const handleFlightChange = (value) => {
    // setFlightOption(value);

    let array = [...flightOption1];

    let indexRemove = array.indexOf(value);
    if (indexRemove == -1) {
      array.push(value);
    } else {
      array.splice(indexRemove, 1);
    }
    // let newArray = [...array.slice(0, index), ...array.slice(index + 1)];
    setFlightOption1([...array]);
    //console.log(array, 'arrayyy', value, array)
  };
  const handleDaysChange = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleClearFilters = () => {
    setPackagedata(Package);
    setPriceRange([min, max]);
    setSelectedTag(null);
    setFlightOption({
      includeFlight: true,
      notIncludeFlight: true,
    });
    setFlightOption1([])
    setSelectedDays([]);
    setSearchTerm("");
    setSelectedDestinations([]);
  };
  

  useEffect(() => {
    console.log(packageData,"packageeeeeee")
    
    setPackagedata(Package)
    if (packageData.length === 0) {
      // if (Package?.length != 0 && packageData?.length == 0 && isFilterApplied) {
      console.log("setpackagedata",Package)
      setToomanyFilter(false);
    } else {
      setToomanyFilter(false);
    }
  }, [Package]);
  useEffect(() => {
    console.log(packageData,"packageeeeeee")
    
    // setPackagedata(Package)
    if ( Package?.length>0 &&  packageData?.length === 0) {
      // if (Package?.length != 0 && packageData?.length == 0 && isFilterApplied) {
      console.log("setpackagedata",Package)
      setToomanyFilter(true);
    } else {
      setToomanyFilter(false);
    }
  }, [packageData]);


  if (loading) {
    return <HolidayResultSkeleton />;
  }

  return (
    <div>
      <div
        className="relative px-0 container-fluid "
        style={{ zIndex: 1, width: "100%" }}
      >
        {loading ? (
          <div className="px-0 col-lg-12">
            <div className="countryDescCardUpper">
              <div className="relative packbannerCountrywise">
                <Skeleton>
                  <img src="" alt="dummy" className="w-full" />
                </Skeleton>
              </div>
              <Skeleton>
                <h2 className="h-[10px] w-[70px]"></h2>
              </Skeleton>
              <Skeleton>
                <p className="h-[10px] w-full"></p>
              </Skeleton>
            </div>
          </div>
        ) : (
          <div className="px-0 col-lg-12">
            {Object.keys(data).length > 0 && (
              <div className="countryDescCardUpper">
                <div className="relative packbannerCountrywise h-[300px]">
                  <img
                    src={data?.imageUrl}
                    alt="city"
                    className="object-cover w-full h-full"
                  />
                  {/* <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-opacity-50">
                    {data?.cityName} Holiday Packages
                  </h1> */}
                  <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-opacity-50">
                    {data?.cityName &&
                      `${data?.cityName
                        ?.charAt(0)
                        .toUpperCase()}${data?.cityName
                        .slice(1)
                        .toLowerCase()} Holiday Packages`}
                  </h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="container px-0">
        <div className="row">
          <div className="">
            {Object.keys(data).length > 0 && (
              <div className="w-full p-4 mb-3 rounded-md">
                <h4 className="font-bold text-black">
                  {data?.cityName} Tour Packages
                </h4>
                <p>{data?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="mt-3 row">
          <div className="p-0 col-lg-3 visibleBig">
            <PackageResultFilter
              uniqueDestinations={uniqueDestinations}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              minPrice={min}
              maxPrice={max}
              priceRange={priceRange}
              selectedTag={selectedTag}
              flightOption={flightOption}
              onTagChange={handleTagChange}
              onFlightChange={handleFlightChange}
              selectedDays={selectedDays}
              onDaysChange={handleDaysChange}
              onSearchTermChange={handleSearchTermChange}
              selectedDestinations={selectedDestinations}
              setSelectedDestinations={setSelectedDestinations}
              onClearFilters={handleClearFilters}
              flightOption1={flightOption1}
            />
          </div>
          <div className="col-lg-12 visibleSmall stickyForMobile">
            <PackageResultFilterMobile
              uniqueDestinations={uniqueDestinations}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              minPrice={min}
              maxPrice={max}
              priceRange={priceRange}
              selectedTag={selectedTag}
              onTagChange={handleTagChange}
              selectedDays={selectedDays}
              onDaysChange={handleDaysChange}
              onSearchTermChange={handleSearchTermChange}
              selectedDestinations={selectedDestinations}
              setSelectedDestinations={setSelectedDestinations}
              onClearFilters={handleClearFilters}
            />
          </div>

          {tooManyFilter ? (
            <div className="col-lg-9">
              <div className="noHotels">
                <h3>Too many filter Applied !</h3>
                <p>
                  Please remove some <FaPen />
                </p>
              </div>
            </div>
          ) : (
            <div className="col-lg-9">
              <HolidayResult
                packages={packageData}
                searchTerm={searchTerm}
                priceRange={priceRange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HolidayPackageResultMain;
