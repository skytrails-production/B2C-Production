import React from 'react';
import Footer from '../../../layouts/Footer';
import Blankdiv from '../../home/searchresult/Blankdiv';
import Searchnavbar from '../../home/searchresult/Searchnavbar';
import TaxiInfo from './TaxiInfo';
import Taxisearchform from './Taxisearchform';
import "./taxisearchresult.css";

const TaxiSearchResult = () => {
    return (
        <div className='taxi_banner'>
            <Searchnavbar />
            <Blankdiv/>
            <Taxisearchform/>
            <TaxiInfo/>
            <Footer />
        </div>
    )
}

export default TaxiSearchResult
