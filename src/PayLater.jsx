import React from 'react'
import { useNavigate } from 'react-router-dom'

const PayLater = () => {
    const navigate = useNavigate();
    return (
        <div className='payLaterBox' style={{ cursor: "pointer" }}>
            <p onClick={() => navigate("/payLaterDetails")}>Pay Later</p>
        </div>
    )
}

export default PayLater
