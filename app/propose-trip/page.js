import { db } from "../_utils/database";
import EmptyLegs from "../components/flight/emptyLegs";

import {redirect} from "next/navigation";

function persistToDb(data) {
    const stmt = db.prepare('INSERT INTO proposed_trip (departure, destination, user_id, no_of_passengers, departure_date) VALUES (@departure, @destination, @user_id, @no_of_passengers, unixepoch(@departure_date))');
    stmt.run(data);
}

async function addTrip(data) {
    'use server'
    const errors = [];
    
    let departure = "";
    let destination = "";
    let plane = "";
    let departure_date = null;
    let no_of_passengers = 0;

    // build error
    if ((departure = data.get("departure")) === "") {
        errors.push({field: "departure", msg: "Missing departure"});
    }
    if ((destination = data.get("destination")) === "") {
        errors.push({field: "destination", msg: "Missing destination"});
    }
    if ((plane = data.get("plane")) === "") {
        errors.push({field: "plane", msg: "Missing plane"});
    }
    if ((departure_date = data.get("departure_date")) === null) {
        errors.push({field: "departure_date", msg: "Missing departure date"});
    }
    if ((no_of_passengers = data.get("no_of_passengers")) === 0) {
        errors.push({field: "no_of_passengers", msg: "Trip needs at least 1 passenger"});
    }

    if (errors.length > 0) {
        return errors;
    }
    persistToDb({
        "departure": departure,
        "destination": destination,
        //"plane": plane,
        // TODO: use user_id from session, if no session go to login?
        "user_id": 1,
        "departure_date": departure_date,
        "no_of_passengers": no_of_passengers,
    });
    redirect('/about');
}

export default function PorposeTrip() {
    return (
        <div className="container">
            <div className="mx-32 my-auto h-full py-64">
                <h1 className="mx-auto text-center text-7xl">Post a travel route and invite people to join.</h1>
                <form action={addTrip} className="flex mt-8 mb-8">
                    <input type="text" name="departure" placeholder="From where?" required className="input input-bordered w-full max-w-xs" />
                    <input type="text" name="destination" placeholder="Where to?" required className="input input-bordered w-full max-w-xs" />
                    <select name="plane" defaultValue="" required className="input input-bordered w-full max-w-xs" >
                        <option value="" disabled>Select plane</option>
                        <option value="cessna">Cessna</option>
                    </select>
                    <input type="date" name="departure_date" required className="input input-bordered w-full max-w-xs" />
                    <input type="number" name="no_of_passengers" defaultValue="1" required className="input input-bordered w-full max-w-xs" />
                    <button type="submit" className="btn">Plan Flight</button>
                </form>
                <EmptyLegs />
            </div>
        </div>
    );
}
