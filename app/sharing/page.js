import ProposedCard from "../components/flight/proposedCard";
import { db } from "../_utils/database";


function proposedTrips() {
    const flights = db.prepare(`
    SELECT proposed_trip.id, departure, destination, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, price, no_of_passengers, private_jet.max_seats as max_seats
    FROM proposed_trip
    LEFT JOIN private_jet
    ON proposed_trip.plane_id=private_jet.id`
    ).all();
    return flights;
}

function Sharing() {
    const flights = proposedTrips();
    return (
            <div className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-1 mx-auto">
                    <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {flights.map(e => ( 
                        <ProposedCard key={e.id} flight={e} />
                    ))}
                    </div>
                </div>
            </div>

    );
}

export default Sharing;