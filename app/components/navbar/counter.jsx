import { useState } from "react";

function CountIcon({icon, onClick}) {
    return (
        <button onClick={onClick} className="border rounded-full w-5 h-5 flex justify-center items-center">
            <span>{icon}</span>
        </button>
    )    
}

function Counter({label}) {
    const [count, setCount] = useState(0);
    return (
        <div className="flex justify-between">
            <p className="font-bold">{label}</p>
            <div className="flex item-center gap-x-1">
                {count > 0 && (
                    <CountIcon icon="-" onClick={() => setCount((prevCount) => prevCount - 1)} />
                    )}
                <span>{count}</span>
                <CountIcon icon="+" onClick={() => setCount((prevCount) => prevCount + 1)} />
            </div>
        </div>
    );
}

export default Counter