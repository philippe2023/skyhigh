import Link from "next/link";

export default function EmptyLegCard({flight}) {
    const price = (flight.price*0.01).toFixed(2);
    return (
        <div className="mt-12 space-y-8 ">
            <Link href={flight.flight_category === "sharing" ? `/sharing/${flight.id}` : `/flights/${flight.id}`}>
                <div className="flex overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:outline hover:outline-2 outline-offset-2 outline-slate-300 solid cursor-pointer duration-200 hover:scale-105">
            <div className="w-1/4 bg-cover" style={{backgroundImage: `url(/images/destinations/${flight.destination.toLowerCase().replace(" ","_")}.jpg)`}}></div>
            <div className="w-3/4 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">September 30, 2023</span>
                    <div className="uppercase px-3 py-1 text-sm font-bold text-slate-900 transition-colors duration-300 transform rounded cursor-pointer hover:bg-gray-500 hover:text-white dark:text-white">Gulfstream G450</div>
                </div>
                <div className="mt-2">
                    <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">London by JP</p>
                    <div className="w-full inline-flex justify-between">
                        <div className="my-9 flex-col items-center">
                            <p>{flight.departure}</p>
                            <p>11:20</p>
                        </div>
                        <div className="my-9 ">
                            <p>12hrs 30mins</p>
                            <p>--------</p>
                            <p>non-stop</p>
                        </div>
                        <div className="my-9">
                            <p>{flight.destination}</p>
                            <p>07:20</p>
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