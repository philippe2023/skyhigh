import Link from "next/link";


function ProposedCard({flight}) {
    const { id } = flight;
    let price = (flight.price).toString();
    price = price.slice(0,-2) + "," + price.slice(-2);

    // construct links using the event ids
    const exploreLink = `/sharing/${id}`;

    return (
        <Link href={exploreLink}>
            <div className="w-full max-w-xs text-align cursor-pointer duration-200 hover:scale-105">
            <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-72 group hover:outline hover:outline-2 outline-offset-2 outline-slate-300 solid" style={{backgroundImage: `url(/images/destinations/${flight.destination.toLowerCase().replace(" ","_")}.jpg)`}}></div>
                <div className="mt-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">{flight.departure} - {flight.destination}</h3>
                    <span className="mt-1 font-medium text-gray-500 dark:text-gray-300">5 seats available</span>
                    <p className="mt-1 font-medium text-gray-500 dark:text-gray-300">{flight.date}</p>
                    <p className="mt-1 font-medium text-gray-900 dark:text-gray-300">EUR {price}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProposedCard;