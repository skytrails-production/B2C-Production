// import React from "react";
// import PackageResultCards from "./PackageResultCards";

// const HolidayResult = ({ packages, priceRange, searchTerm }) => {
//   // console.log(packages, "packages")
//   let filteredPackages = packages?.filter((pkg) => {
//     if (
//       searchTerm &&
//       !pkg.pakage_title.toLowerCase().includes(searchTerm.toLowerCase())
//     ) {
//       return false;
//     }
//     if (
//       pkg.pakage_amount.amount &&
//       pkg.pakage_amount.amount >= priceRange[0] &&
//       pkg.pakage_amount.amount <= priceRange[1]
//     ) {
//       return true;
//     }
//     // return true;
//   });

//   return (
//     <div className="row g-4" style={{ border: "2px solid red" }}>
//       {filteredPackages?.map((pkg, index) => (
//         <div key={index} className="col-lg-6">
//           <PackageResultCards data={pkg} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HolidayResult;

import React from "react";
import PackageResultCards from "./PackageResultCards";
import { Spin } from "antd"; // Ant Design's loading spinner

const HolidayResult = ({ packages, priceRange, searchTerm }) => {
  // Filtering packages based on searchTerm and priceRange
  console.log("innerpackage", packages);
  let filteredPackages = packages?.filter((pkg) => {
    if (
      searchTerm &&
      !pkg.pakage_title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (
      pkg.pakage_amount.amount &&
      pkg.pakage_amount.amount >= priceRange[0] &&
      pkg.pakage_amount.amount <= priceRange[1]
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="row g-4">
      {packages && packages.length === 0 ? (
        <div className="flex items-center justify-center h-screen w-200">
          <Spin size="large" />
        </div>
      ) : filteredPackages && filteredPackages.length > 0 ? (
        filteredPackages.map((pkg, index) => (
          <div key={index} className="col-lg-6">
            <PackageResultCards data={pkg} />
          </div>
        ))
      ) : (
        <div className="text-center w-100">No packages found</div>
      )}
    </div>
  );
};

export default HolidayResult;
