import React from 'react'
import "./offline.css"

const Offline = () => {
    return (
        <div className='oflineContainer' style={{position:"relative", zIndex:"2147483648"}}>

            <div className='oflineSvgContainer'><svg id="fi_9345787"  viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m12.88 8.64-1.5-1.5c1.38-.74 2.96-1.14 4.62-1.14 4.14 0 7.8 2.5599 9.3 6.4199 2.7799.9601 4.7 3.6001 4.7 6.5801 0 1.86-.74 3.58-1.9399 4.8199l-1.4-1.4c.8199-.88 1.34-2.1 1.34-3.4199 0-2.26-1.54-4.24-3.74-4.8201l-.52-.14-.1799-.5c-1.0801-3.3199-4.1201-5.5399-7.5601-5.5399-1.1 0-2.16.22-3.12.64zm13.6 16.4199-1.48-1.48c-.0015.0006-.0031.0009-.0045.0015l-13.8787-13.8786c.0011-.0009.0021-.002.0032-.0028l-1.4399-1.4399c-.0011.0009-.002.0021-.0031.0029l-6.2629-6.263-1.4141 1.4141 6.288 6.288c-.6508.8076-1.2001 1.7118-1.588 2.7179-2.7799.9601-4.7 3.6001-4.7 6.5801 0 3.86 3.14 7 7 7h14c.4874 0 .9611-.0652 1.4236-.1624l4.1624 4.1624 1.4141-1.4141-3.524-3.524c.0012-.0007.0028-.0012.004-.002z"></path></svg></div>
            <div>
                <div className='oflineH1'>You are offline

                </div>
                <div className='oflinep'>Please check your network connection.</div>
            </div>
        </div>
    )
}

export default Offline
