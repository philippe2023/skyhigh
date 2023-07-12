import { Input } from "postcss";
import { useState } from "react";

function SearchBar() {
    const [searchActivate, setIsSearchActivated] = useState(false)
    return (
        <div className='flex flex-row self-center rounded-full border p-2 mt-8'>
            <button onClick={() => setIsSearchActivated(true)}>
            <p className="font-bold">Where?</p>
                {
                    setIsSearchActivated ? ( <input type="text" placeholder="Search destinations" className="text-slate-800 bg-transparent border-none outline-none" />) : (
                        <div>
                            <p className="text-slate-600">Search destination</p>
                        </div>
                    )
                }
            </button>
            <div className="dropdown dropdown-end px-4 border-l border-r">
                <label tabIndex={1}>
                    <p className="font-bold">Date</p>
                    <p className="text-slate-600">Select date</p>
                </label>
                <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <p>Date Selector</p>
                </div>
            </div>
            <div className="dropdown dropdown-end px-4">
                <label tabIndex={2}>
                    <p className="font-bold">Who</p>
                    <p className="text-slate-600">Add guests</p>
                </label>
                <div tabIndex={2} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <p>Guests Selector</p>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;