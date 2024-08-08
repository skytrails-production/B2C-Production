import React, { useEffect } from 'react'
import "./PhoneNumber.css";

const PhoneNumber = () => {
    function openDialer() {
        window.location.href = "tel:++919209793097";
    }
    
    useEffect(()=>{
        openDialer();
    })
  return (
    // <div>PhoneNumber</div>
    <>
    <div style={{height:"100vh",width:"100vw",alignItems:"center",justifyContent:"center",display:"flex"}}>
    <div>

        <div className='loaderphone'></div>
        </div>
    </div>
    </>
  )
}

export default PhoneNumber;