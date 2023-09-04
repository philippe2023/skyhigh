import Link from "next/link";

function EmptyLegCard({city}) {
    const { id } = city;
    const price = (city.price*0.01).toFixed(2);

    // construct links using the event ids
    const exploreLink = `/flights/${id}`;

    return (
        <Link href={exploreLink}>
            <div className="w-full max-w-xs text-align cursor-pointer">
                <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group hover:outline hover:outline-2 outline-offset-2 outline-slate-300 solid" style={{backgroundImage: `url(/images/destinations/${city.destination.toLowerCase().replace(" ","_")}.jpg)`}}>
                    <div className="flex flex-col justify-between w-full h-full px-5 pb-4 transition-opacity duration-700 group-hover:backdrop-blur-sm group-hover:bg-slate-500/30">
                    <button className="mt-4 px-2 py-1 w-24 text-sm text-white capitalize font-medium transition-colors duration-300 transform bg-slate-900 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">{city.date}</button>
                        <div>
                            <h2 className="text-xl font-semibold text-white capitalize">{city.departure} - {city.destination}</h2>
                            <p className="mt-2 text-md font-light tracking-wider text-white">up to {city.max_seats}</p>
                            <h2 className="mt-4 mb-6 text-xl font-semibold text-white capitalize">from € {price}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default EmptyLegCard;