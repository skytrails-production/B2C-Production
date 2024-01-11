import React from 'react';

const TravelerCounter = ({ label, count, onIncrement, onDecrement }) => {
    return (
        <div className='TravelerCounter'>
            <p>
                {label}
            </p>
            <div>
                <button onClick={onDecrement}>-</button>
                <span>{count}</span>
                <button onClick={onIncrement}>+</button>
            </div>
        </div>
    );
};

export default TravelerCounter;
