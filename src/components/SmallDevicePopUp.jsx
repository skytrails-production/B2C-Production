import React ,{useState,useEffect} from 'react'
import "./SmallDevicePopUp.css"
import { DatePicker, Button } from "antd";
import { useLocation } from 'react-router-dom';


const SmallDevicePopUp = () => {
    const [show,setShow]=useState(true);
     const location = useLocation();

     const { pathname } = useLocation();

     useEffect(() => {
        setShow(true)
     }, [pathname]);
     function redirectToStore() {
        // User Agent of the device
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
        // Detect Android
        if (/android/i.test(userAgent)) {
          window.location.href = "https://play.google.com/store/apps/details?id=com.skytrails";
        }
        // Detect iOS
        else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.location.href = "https://apps.apple.com/in/app/the-skytrails/id6475768819";
        }
        // Other devices
        else {
          console.log("This feature is only available on Android and iOS devices.");
        }
      }


     const handleInstall = ()=>{
        window.location.href = 'https://play.google.com/store/apps/details?id=com.skytrails';
     }
    
    return (
        <>
       {show && 
        <div className='smallContainer'>
            <div className="smallContainerInner">


                <div className='smallContainerHeader'>
                    <div className="text-center text-bold">Get app exclusive Offers</div>
                    <div onClick={()=>setShow(false)} style={{cursor:"pointer"}}>X</div>
                </div>
                <div className='smallContainerBody'>Download app and Grab Up to 20% Off on 1st Booking on Flights,Hotels,Holiday or more.</div>
                <div className='"smallContainerBtn'>
                <Button type="primary" onClick={redirectToStore} >Install Now</Button>
                </div>
            </div>
        </div>}
        </>
    )
}

export default SmallDevicePopUp
