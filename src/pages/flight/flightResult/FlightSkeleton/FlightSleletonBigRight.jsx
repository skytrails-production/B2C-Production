
import React from 'react'
import "./FlightSleletonBigRight.scss"

const FlightSleletonBigRight = () => {
    let data=[1,2,3,4,5,6,7,8,9,10]
  return (
    <div className='FlightRightSkeleton'>
      {
        data.map((item, i) => {
            return(
                <div className='FlightRightSkeletonItem' key={i}>
                    
                </div>
            )
        })
      }
    </div>
  )
}

export default FlightSleletonBigRight
