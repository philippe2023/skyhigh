import EmptyLegCard from "./component/emptyLegCardDetail";
import { db } from "../_utils/database";


function emptyLegs() {
    const flights = db.prepare("SELECT id, departure, destination, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, price from empty_leg").all();
    return flights;
}

function Flights() {
    const flights = emptyLegs()
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container max-w-4xl px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">Available Flights</h1>
                {flights.map(e => ( 
                    <EmptyLegCard key={e.id} flight={e} />
                ))}

            </div>
        </div>
    );
}

export default Flights;