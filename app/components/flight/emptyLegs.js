import EmptyLegCard from "./emptyLegCard";
import Link from "next/link";

import { db } from "../../_utils/database";

function getFeaturedLegs() {
  const featured = db.prepare(`
  SELECT empty_leg.id as id, departure, destination, price, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, max_seats
  FROM empty_leg
  LEFT JOIN private_jet
  ON empty_leg.plane_id=private_jet.id
  WHERE featured=TRUE
  LIMIT 4`).all();
  return featured;
}

function EmptyLegs() {
    const featured = getFeaturedLegs();
    return (
        <div className="bg-white dark:bg-slate-900">
            <div className="container px-6 mx-auto dark:bg-slate-900">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Discover empty legs</h1>
                    <Link href="/flights">                
                        <button className="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <div className="my-8 border-gray-200 dark:border-gray-700">
                    <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 ">
                            {featured.map(city => (
                                <EmptyLegCard key={city.id} city={city}/>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyLegs;