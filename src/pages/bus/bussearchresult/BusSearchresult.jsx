import React from 'react';
import Footer from '../../../layouts/Footer';
import Blankdiv from '../../home/searchresult/Blankdiv';
import Searchnavbar from '../../home/searchresult/Searchnavbar';
import BusReasultForm from './BusReasultForm';
import BusSearchReasultDetail from './BusSearchReasultDetail';
import "./bussearchresult.css";

const BusSearchresult = () => {
    return (
        <div className='bus_banner'>
            <Searchnavbar />
            <Blankdiv />
            <BusReasultForm/>
            <BusSearchReasultDetail />
            <Footer />
        </div>
    )
}

export default BusSearchresult
