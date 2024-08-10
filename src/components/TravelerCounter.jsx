import React from 'react';

const TravelerCounter = ({ label, sublabel, count, onIncrement, onDecrement }) => {
    return (
        <div className='TravelerCounterInner'>
            <div className='travellerTextContent'>
                <label>
                    {label}
                </label>
                <small>{sublabel}</small>
            </div>
            <div className='travellerClickButtons'>
                <h3 onClick={onDecrement}>-</h3>
                <span>{count}</span>
                <h3 onClick={onIncrement}>+</h3>
            </div>
        </div>
    );
};

export default TravelerCounter;
