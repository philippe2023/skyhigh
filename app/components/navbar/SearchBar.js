import { Input } from "postcss";
import { useState } from "react";
import Counter from "./counter";
import { BiSearch } from 'react-icons/bi';


function SearchBar() {
    const [searchActivate, setIsSearchActivated] = useState(false)
    const [tripDate, setTripDate] = useState(new Date());

    return (
        <div className='flex flex-row self-center rounded-full border p-2'>
            <button onClick={() => setIsSearchActivated(true)}>
            <p className="font-bold">Where?</p>
                {
                    setIsSearchActivated ? ( <input type="text" placeholder="Search destinations" className="text-slate-900 bg-transparent border-none outline-none leading-6 placeholder-slate-400 dark:text-white" />) : (
                        <div>
                            <p className="text-slate-600">Search destination</p>
                        </div>
                    )
                }
            </button>
            <div className="px-4 border-l border-r">
                <label>
                <button onClick={() => setIsSearchActivated(true)}>
                    <p className="font-bold">Date</p>
                    {
                        setIsSearchActivated ? ( <input type="date" placeholder="Search date" required className="text-slate-900 bg-transparent border-none outline-none leading-6 placeholder-slate-400 dark:text-white" />) : (
                            <div>
                                <p className="text-slate-600">hello</p>
                            </div>
                        )
                    }
                    </button>
                </label>
            </div>
            <div className="dropdown dropdown-end px-4">
                <label tabIndex={2}>
                    <p className="font-bold">Who</p>
                    <p className="text-slate-600">Add guests</p>
                </label>
                <div tabIndex={2} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <Counter label="Adults" />
                </div>
            </div>
            <button className="px-6 text-white rounded-full bg-black flex my-auto py-4 dark:bg-slate-200 dark:text-black">
                <BiSearch className="h-5 w-5" />
                <span>Search</span>
            </button>
        </div>
    );
}

export default SearchBar;