import dayjs from "dayjs";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"; // Importing icons for arrows

const DomesticCard = ({ className = "", data }) => {
  const navigate = useNavigate();

  const handleCountryClick = async (category) => {
    const queryParameter = category;
    navigate(`/holidaypackages/country/${queryParameter}`);
  };

  return (
    <div
      className={`nc-CardCategory3 pb-16 relative cursor-pointer flex flex-col items-center ${className}`}
      onClick={() => handleCountryClick(data?.destination)}
    >
      <div className=" w-full aspect-w-5  aspect-h-3 sm:aspect-h-6 rounded-2xl overflow-hidden ">
        {/* Image */}
        <img
          src={data?.imageUrl}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
        />

        {/* Text Section */}
        <div className="absolute shadow-md w-[90%] bottom-2 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-2xl">
          <h3 className="text-lg font-semibold truncate capitalize">
            {data?.destination}
          </h3>
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              From<b className="text-lg"> ₹ {data?.startFrom}</b>
            </p>
            <Link
              to="#"
              className="text-primary-6000 text-sm font-semibold inline-flex items-center no-underline "
            >
              Explore <BiChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticCard;
