import { db } from "../_utils/database";
import FlightFilter from "./component/flightFilter";

function emptyLegs() {
    const flights = db.prepare(`
    SELECT
        id, departure, destination, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, price, 'sharing' AS flight_category
    FROM proposed_trip WHERE reservation_open=1
    UNION ALL
    SELECT
        id, departure, destination, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, price, 'empty_leg' AS flight_category
    FROM empty_leg WHERE reservation_open=1;`).all();
    return flights;
}

function Flights({searchParams}) {
    const flights = emptyLegs();

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container max-w-4xl px-6 py-10 mx-auto">
                <FlightFilter flights={flights} destination={searchParams?.destination} flightCategory={searchParams?.category} />
            </div>
        </div>
    );
}

export default Flights;