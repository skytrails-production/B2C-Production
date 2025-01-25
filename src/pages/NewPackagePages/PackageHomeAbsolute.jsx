import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Under 50k",
    value: "50000",
    image:
      "https://skytrails.s3.amazonaws.com/holidayPics/uploadedFile_1732016860535_1.jpg",
  },
  {
    name: "Under 100k",
    value: "100000",
    image:
      "https://skytrails.s3.amazonaws.com/holidayPics/uploadedFile_1732016884961_2.jpg",
  },
  {
    name: "Under 150k",
    value: "150000",
    image:
      "https://skytrails.s3.amazonaws.com/holidayPics/uploadedFile_1732016908094_3.jpg",
  },
  {
    name: "above 150k",
    value: "200000",
    image:
      "https://skytrails.s3.amazonaws.com/holidayPics/uploadedFile_1732016924541_4.jpg",
  },
];

const PackageHomeAbsolute = () => {
  const navigate = useNavigate();

  const handleBudget = async (category) => {
    const queryParameter = `${category}`;
    navigate(`/holidaypackages/budget/${queryParameter}`);
  };

  return (
    <div className="container mb-4 mt-[-30px] z-10 relative">
      <div className="grid grid-cols-4 mx-auto w-full md:w-2/3  p-3 md:p-4 bg-white rounded-full shadow-md overflow-x-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleBudget(category.value)}
            className={`flex flex-row cursor-pointer hover:text-primary-6000  justify-center gap-2 items-center h-full  space-y-2 ${
              index !== categories.length - 1
                ? "md:border-r border-gray-300"
                : ""
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="text-[12px] md:text-base lg:text-base mt-0 font-medium">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageHomeAbsolute;
