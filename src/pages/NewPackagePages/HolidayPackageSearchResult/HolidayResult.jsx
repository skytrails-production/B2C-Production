import React from 'react'
import PackageResultCards from './PackageResultCards';


const HolidayResult = ({ packages, priceRange, searchTerm }) => {


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
        // return true;
    });

    return (
        <div className='row g-4'>
            {filteredPackages?.map((pkg, index) => (

                <div key={index} className="col-lg-6">
                    <PackageResultCards
                        data={pkg}

                    />
                </div>

            ))}
        </div>
    )
}

export default HolidayResult;
