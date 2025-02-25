import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import { searchAllPackageAction } from "../../../Redux/SearchPackage/actionSearchPackage";
import { clearHolidayReducer } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import AllMainResult from "./AllMainResult";
import HolidayResultSkeleton from "../HolidayPackageSearchResult/holidayresultSkeletonPage/HolidayResultSkeleton";
import AllPackageFilter from "./AllPackageFilter";

const AllMainPageHoliday = () => {
  const reducerState = useSelector((state) => state);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [flightIncluded, setFlightIncluded] = useState(null);
  const [hotelIncluded, setHotelIncluded] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [packageData, setPackagedata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooManyFilter, setToomanyFilter] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { keyword, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearHolidayReducer());
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [keyword]);

  useEffect(() => {
    if (type == "category") {
      const formattedKeyword =
        keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
      dispatch(searchAllPackageAction(formattedKeyword));
    }

    sessionStorage.setItem("searchPackageData", JSON.stringify(keyword));
  }, [dispatch, keyword, type]);

  const Package =
    reducerState?.searchResult?.packageSearchResult?.data?.data || [];

  useEffect(() => {
    if (Package.length > 0) {
      setLoading(false);
      setPackagedata(Package);
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
    includeHotel,
    days
  ) => {
    let filtered = Package;

    if (selectedDestinations?.length > 0) {
      filtered = filtered?.filter((pkg) =>
        selectedDestinations.every((dest) =>
          pkg?.destination?.some((d) => d.addMore === dest)
        )
      );
      setIsFilterApplied(true);
    }

    if (includeFlight) {
      if (includeFlight === "flight") {
        filtered = filtered?.filter((pkg) =>
          pkg?.inclusions?.some((t) => t.flight === "true")
        );
        setIsFilterApplied(true);
      } else if (includeFlight === "no-flight") {
        filtered = filtered?.filter(
          (pkg) => !pkg?.inclusions?.some((t) => t.flight === "true")
        );
        setIsFilterApplied(true);
      }
    }
    if (includeHotel) {
      if (includeHotel === "hotel") {
        filtered = filtered?.filter((pkg) =>
          pkg?.inclusions?.some((t) => t.hotel === "true")
        );
        setIsFilterApplied(true);
      } else if (includeHotel === "no-hotel") {
        filtered = filtered?.filter(
          (pkg) => !pkg?.inclusions?.some((t) => t.hotel === "true")
        );
        setIsFilterApplied(true);
      }
    }

    if (tag) {
      filtered = filtered?.filter((pkg) =>
        pkg.specialTag.some((t) => t[tag] === true)
      );
      setIsFilterApplied(true);
    }

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
        setIsFilterApplied(true);
        return daysInRange;
      });
    }

    setPackagedata(filtered);
  };

  console.log(packageData, "package data");

  const getMinMaxPrices = (Pack) => {
    if (!Pack || Pack.length === 0) {
      return { min: 0, max: 0 };
    }

    const validPackage = Pack?.filter(
      (pkg) => pkg && pkg?.packageAmount?.[0]?.amount
    );

    if (validPackage.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = validPackage?.map((pkg) => pkg.packageAmount?.[0].amount);
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
    setFlightIncluded(value);
  };
  const handleHotelChange = (value) => {
    setHotelIncluded(value);
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
    setFlightIncluded(null);
    setSelectedDays([]);
    setSearchTerm("");
    setSelectedDestinations([]);
  };

  useEffect(() => {
    if (Package?.length != 0 && packageData?.length == 0 && isFilterApplied) {
      setToomanyFilter(true);
    } else {
      setToomanyFilter(false);
    }
  }, [Package, packageData]);

  if (loading) {
    return <HolidayResultSkeleton />;
  }

  return (
    <div>
      {/* <Navbar /> */}

      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
        className="flightMainBox relative py-16 bg-purple-200 bg-[radial-gradient(circle,_rgba(70,81,229,1)_0%,_rgba(101,102,214,1)_100%)] hidden md:flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <div className="relative z-10">
          <h2 className="text-center font-bold text-white pb-8">
            Leisure Packages
          </h2>
        </div>
      </div>
      <>
        <div className="container ">
          <div className="mt-3 row">
            <div className="p-0 col-lg-3 visibleBig">
              <AllPackageFilter
                uniqueDestinations={uniqueDestinations}
                onFilterChange={handleFilterChange}
                onPriceChange={handlePriceChange}
                minPrice={min}
                maxPrice={max}
                priceRange={priceRange}
                selectedTag={selectedTag}
                flightIncluded={flightIncluded}
                onTagChange={handleTagChange}
                onFlightChange={handleFlightChange}
                hotelIncluded={hotelIncluded}
                onHotelChange={handleHotelChange}
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
                  <p className="flex gap-2 items-center justify-center">
                    Please remove some <FaPen />
                  </p>
                </div>
              </div>
            ) : (
              <div className="col-lg-9">
                <AllMainResult
                  packages={packageData}
                  searchTerm={searchTerm}
                  priceRange={priceRange}
                />
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default AllMainPageHoliday;
