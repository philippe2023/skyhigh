'use client';

import { BiSearch } from 'react-icons/bi';
import { useState } from "react";
import SearchBar from './SearchBar';
import { useClickAway } from "@uidotdev/usehooks";

function Search() {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    };
    const ref = useClickAway(() => {
    setIsExpanded(false);
    });


    return (
        <div ref={ref}>
            {isExpanded ? (<SearchBar />) : (
                    <button onClick={toggleExpanded} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-sm font-semibold px-6">
                                Destination
                            </div>
                            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                                Any week
                            </div>
                            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                                <div className="hidden sm:block">Add Guests</div>
                                <div className="p-2 bg-gray-500 rounded-full text-white"><BiSearch size={18} /></div>
                            </div>
                        </div>
                    </button>
                )
                
            }
        </div>
    );
}

export default Search;