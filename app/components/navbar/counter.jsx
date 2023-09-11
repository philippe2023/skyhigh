import { useState } from "react";

function CountIcon({icon, onClick}) {
    return (
        <button onClick={onClick} className="border rounded-full w-5 h-5 flex justify-center items-center">
            <span>{icon}</span>
        </button>
    )    
}

function Counter({props: {noOfPassengers, setNoOfPassengers}}) {
    return (
        <div className="flex justify-between">
            <p className="font-bold">Adults</p>
            <div className="flex item-center gap-x-1">
                {noOfPassengers > 1 && (
                    <CountIcon icon="-" onClick={() => setNoOfPassengers((prevCount) => prevCount - 1)} />
                    )}
                <span>{noOfPassengers}</span>
                <CountIcon icon="+" onClick={() => setNoOfPassengers((prevCount) => prevCount + 1)} />
            </div>
        </div>
    );
}

export default Counter