import React from "react";

import FlightSuggestCard from "./FlightSuggestCard";
import Heading from "../shared/Heading";

const DEMO_CATS = [
  {
    id: "1",
    href: "/listing-stay-map",
    name: "New York",
    taxonomy: "category",
    count: 1882,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay-map",
    name: "Singapore",
    taxonomy: "category",
    count: 8288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay-map",
    name: "Paris",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay-map",
    name: "London",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay-map",
    name: "Tokyo",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "6",
    href: "/listing-stay-map",
    name: "Maldives",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/listing-stay-map",
    name: "New York",
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "8",
    href: "/listing-stay-map",
    name: "Singapore",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const flightRoutes = [
  {
    id: 1,
    from: "Chennai",
    destination: "Mumbai",
    code: "BOM",
    arrivalCode: "MAA",
    code1: "MAA-BOM",
    imgages:
      "https://images.pexels.com/photos/3454027/pexels-photo-3454027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "MAA",
      CityCode: "MAA",
      CountryCode: "IN ",
      code: "Chennai International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "Maa",
      name: "Chennai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
    to: {
      AirportCode: "BOM",
      CityCode: "BOM",
      CountryCode: "IN ",
      code: "Chhatrapati Shivaji Maharaj International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "BOM",
      name: "Mumbai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
  },
  {
    id: 2,
    from: "Delhi",
    destination: "Mumbai",
    code: "DEL",
    arrivalCode: "BOM",
    code1: "DEL-BOM",
    imgages:
      "https://images.pexels.com/photos/14520365/pexels-photo-14520365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },

    to: {
      AirportCode: "BOM",
      CityCode: "BOM",
      CountryCode: "IN ",
      code: "Chhatrapati Shivaji Maharaj International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "BOM",
      name: "Mumbai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
  },

  {
    id: 3,
    from: "Hyderabad",
    destination: "Mumbai",
    code: "HYD",
    arrivalCode: "BOM",
    code1: "HYD-BOM",
    imgages:
      "https://images.pexels.com/photos/5491756/pexels-photo-5491756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "HYD",
      CityCode: "HYD",
      CountryCode: "IN ",
      code: "Rajiv Gandhi International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "HYD",
      name: "Hyderabad",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba942db",
    },
    to: {
      AirportCode: "BOM",
      CityCode: "BOM",
      CountryCode: "IN ",
      code: "Chhatrapati Shivaji Maharaj International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "BOM",
      name: "Mumbai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
  },
  {
    id: 4,
    from: "Chandigarh",
    destination: "Delhi",
    code: "IXC",
    arrivalCode: "DEL",
    code1: "IXC-DEL",
    imgages:
      "https://images.pexels.com/photos/4059538/pexels-photo-4059538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "IXC",
      CityCode: "IXC",
      CountryCode: "IN ",
      code: "Chandigarh",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "IXC",
      name: "Chandigarh",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94368",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
  {
    id: 5,
    from: "Patna",
    destination: "Delhi",
    code: "PAT",
    arrivalCode: "DEL",
    code1: "PAT-DEL",
    imgages:
      "https://images.pexels.com/photos/3454027/pexels-photo-3454027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "PAT",
      CityCode: "PAT",
      CountryCode: "IN ",
      code: "Patna",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "PAT",
      name: "Patna",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94886",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
  {
    id: 5,
    from: "Patna",
    destination: "Delhi",
    code: "PAT",
    arrivalCode: "DEL",
    code1: "PAT-DEL",
    imgages:
      "https://images.pexels.com/photos/3454027/pexels-photo-3454027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "PAT",
      CityCode: "PAT",
      CountryCode: "IN ",
      code: "Patna",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "PAT",
      name: "Patna",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94886",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
  {
    id: 5,
    from: "Patna",
    destination: "Delhi",
    code: "PAT",
    arrivalCode: "DEL",
    code1: "PAT-DEL",
    imgages:
      "https://images.pexels.com/photos/3454027/pexels-photo-3454027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "PAT",
      CityCode: "PAT",
      CountryCode: "IN ",
      code: "Patna",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "PAT",
      name: "Patna",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94886",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
  {
    id: 5,
    from: "Patna",
    destination: "Delhi",
    code: "PAT",
    arrivalCode: "DEL",
    code1: "PAT-DEL",
    imgages:
      "https://images.pexels.com/photos/3454027/pexels-photo-3454027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fromDetails: {
      AirportCode: "PAT",
      CityCode: "PAT",
      CountryCode: "IN ",
      code: "Patna",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "PAT",
      name: "Patna",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94886",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
];

const FlightSuggestion = ({
  categories = flightRoutes,
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  return (
    <div
      className={`nc-SectionGridCategoryBox custom-container mt-16 relative ${className}`}
    >
      <Heading
        desc="Discover great prices for popular destinations"
        isCenter={true}
      >
        Explore Cheapest Flight
      </Heading>
      <div className={`grid ${gridClassName} gap-3 sm:gap-3 md:gap-3`}>
        {categories.map((item, i) => (
          <FlightSuggestCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default FlightSuggestion;
