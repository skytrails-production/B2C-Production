import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Under 100k",
    value: "100000",
    image:
      "https://images.pexels.com/photos/6780256/pexels-photo-6780256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Under 200k",
    value: "200000",
    image:
      "https://images.pexels.com/photos/29226221/pexels-photo-29226221/free-photo-of-taj-mahal-palace-hotel-at-night-in-mumbai.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Under 300k",
    value: "300000",
    image:
      "https://images.pexels.com/photos/29226221/pexels-photo-29226221/free-photo-of-taj-mahal-palace-hotel-at-night-in-mumbai.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "above 300k",
    value: "400000",
    image:
      "https://images.pexels.com/photos/4429333/pexels-photo-4429333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const PackageHomeAbsolute = () => {
  const navigate = useNavigate();

  const handleBudget = async (category) => {
    const queryParameter = `${category}`;
    navigate(`/holidaypackages/budget/${queryParameter}`);
  };

  return (
    <div className="container mb-4 mt-[-50px] z-10 relative">
      <div className="grid grid-cols-4 mx-auto w-2/3  p-4 bg-white rounded-full shadow-md overflow-x-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleBudget(category.value)}
            className={`flex flex-row cursor-pointer hover:text-primary-6000  justify-center gap-2 items-center h-full  space-y-2 ${
              index !== categories.length - 1 ? "border-r border-gray-300" : ""
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="text-lg mt-0 font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageHomeAbsolute;
