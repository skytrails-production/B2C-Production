import React from 'react';
import Footer from '../../../layouts/Footer';
import Blankdiv from '../../home/searchresult/Blankdiv';
import Searchnavbar from '../../home/searchresult/Searchnavbar';
import Taxisearchform from '../taxisearchresult/Taxisearchform';
import "./taxibookingresult.css"
import TaxiTravellerInfo from './TaxiTravellerInfo';

const TaxiBookingResult = () => {
  return (
    <div className='taxibookresult_banner'>
      <Searchnavbar/>
      <Blankdiv/>
      <Taxisearchform/>
      <TaxiTravellerInfo/>
      <Footer/>
    </div>
  )
}

export default TaxiBookingResult
