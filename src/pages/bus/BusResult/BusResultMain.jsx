import React from 'react'
import BusFormInner from '../BusFormInner'
import BusResult from '../bussearchresult/BusResult'

const BusResultMain = () => {
    return (
        <div>
            <div className='mainimgHotelSearchResult visibleBigHotel'>
                <BusFormInner />


            </div>

            <BusResult />

        </div>
    )
}

export default BusResultMain
