import Link from "next/link";

export default function EmptyLegCard({flight}) {
    const price = (flight.price*0.01).toFixed(2);
    return (
        <div className="mt-12 space-y-8">
            <Link href={flight.flight_category === "sharing" ? `/sharing/${flight.id}` : `/flights/${flight.id}`}>
                <div className="flex overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:outline hover:outline-2 outline-offset-2 outline-slate-300 solid cursor-pointer duration-200 hover:scale-105">
            <div className="w-1/4 bg-cover" style={{backgroundImage: `url(/images/destinations/${flight.destination.toLowerCase().replace(" ","_")}.jpg)`}}></div>
            <div className="w-3/4 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{flight.date}</span>
                    <div className="uppercase px-3 py-1 text-sm font-bold text-slate-900 transition-colors duration-300 transform rounded cursor-pointer hover:bg-gray-500 hover:text-white dark:text-white">{flight.plane}</div>
                </div>
                <div className="mt-2">
                    <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Flight to <span className="text-blue-600">{flight.destination}</span></p>
                    <div className="w-full inline-flex justify-between py-3">
                        <div className="my-9 flex-col items-center">
                            <p className=" dark:text-white font-semibold text-center text-xl text-blue-600">{flight.departure}</p>
                            <p className="text-slate-800 dark:text-white font-semibold text-center text-md">11:20</p>
                        </div>
                        <div className="my-auto text-slate-800 dark:text-white">
                            <p className="font-semibold text-center">12hrs 30mins</p>
                            <div className="my-3 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-800 dark:fill-white" fill="#000000" width="50px" height="40px" viewBox="0 0 56 56"><path d="M 54.4141 28 C 54.3906 25.2578 50.6639 23.2656 46.1874 23.2656 L 36.7421 23.2656 C 35.4296 23.2656 34.9374 23.0547 34.1640 22.1641 L 18.4140 4.9844 C 17.9218 4.4219 17.3124 4.1406 16.6093 4.1406 L 13.8905 4.1406 C 13.2812 4.1406 12.9296 4.6797 13.2343 5.3359 L 21.3437 23.2656 L 9.4374 24.6250 L 5.1952 16.8437 C 4.8905 16.2578 4.3749 16 3.6015 16 L 2.5937 16 C 1.9843 16 1.5859 16.3984 1.5859 17.0078 L 1.5859 38.9922 C 1.5859 39.6016 1.9843 39.9766 2.5937 39.9766 L 3.6015 39.9766 C 4.3749 39.9766 4.8905 39.7188 5.1952 39.1563 L 9.4374 31.3750 L 21.3437 32.7344 L 13.2343 50.6641 C 12.9296 51.2968 13.2812 51.8594 13.8905 51.8594 L 16.6093 51.8594 C 17.3124 51.8594 17.9218 51.5547 18.4140 51.0156 L 34.1640 33.8125 C 34.9374 32.9453 35.4296 32.7344 36.7421 32.7344 L 46.1874 32.7344 C 50.6639 32.7344 54.3906 30.7188 54.4141 28 Z"/></svg>
                            </div>
                            <p className="font-semibold text-center">non-stop</p>
                        </div>
                        <div className="my-auto">
                            <p className=" dark:text-white font-semibold text-center text-xl text-blue-600">{flight.destination}</p>
                            <p className="text-slate-800 dark:text-white font-semibold text-center text-md">07:20</p>
                        </div>
                    </div>
                    
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div></div>
                    <div className="flex items-center">
                        <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">€ {price}</p>
                    </div>
                </div>
            </div>
            </div>
            </Link>
        </div>
    );
}