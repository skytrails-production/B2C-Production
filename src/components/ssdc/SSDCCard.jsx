import React from 'react'

function SSDCCard({ jobs }) {
  return (
   
    <>
        <div class="row ssdclandingrow1">
   
   <div class="col-12 col-md-6 col-lg-4 grid-content1">
   <div className="grid-content-container">Period Of Employement</div>
   <div className="grid-content-container1">{jobs.employmentPeriod}</div>
    
   </div>

  
   <div class="col-12 col-md-6 col-lg-4 grid-content1">
   <div className="grid-content-container">Type Of Visa</div>
   <div className="grid-content-container1">{jobs.visaType}</div>
    
   </div>

  
   <div class="col-12 col-md-6 col-lg-4 grid-content1">
   <div className="grid-content-container">Working Hours</div>
   <div className="grid-content-container1">{jobs.workingHours}</div>
    
   </div>
   <div class="col-12 col-md-6 col-lg-4 grid-content1">
   <div className="grid-content-container">Food, Accomadation, Transporattion</div>
   <div className="grid-content-container1">{jobs.Foodetc}</div>
    
   </div>

</div>

    </>
  )
}

export default SSDCCard