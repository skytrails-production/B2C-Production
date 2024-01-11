import React from 'react';
import './holidaypackagesearchresult.css';
import HolidayPackagesDetail from './HolidayPackagesDetail';
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";


const HolidayPackageSearchResult = () => {
    return (
        <>
            <div className="mainimgPackageSearch">
                <InsideNavbar />
            </div>

            <section>
                <HolidayPackagesDetail />
            </section>
        </>
    )
}

export default HolidayPackageSearchResult
