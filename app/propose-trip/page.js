import { db } from "../_utils/database";
import EmptyLegs from "../components/flight/emptyLegs";

import {redirect} from "next/navigation";

// create a random flight number
// with a two-character airline designator and a 1 to 4 digit number
// e.g: LH 1256, AF 123, BA 4567
function generateFlightNumber() {
    // pick two random letters as airline designator
    const airline = String.fromCharCode(65 + Math.floor(Math.random() * 26), 65 + Math.floor(Math.random() * 26));
    // pick a random number between 1 and 9999
    const number = Math.floor(Math.random() * 9999) + 1;
    return airline + " " + number;
}

function persistToDb(data) {
    const stmt = db.prepare('INSERT INTO proposed_trip (departure, destination, price, currency, user_id, no_of_passengers, departure_date, flight_number) VALUES (@departure, @destination, @price, @currency, @user_id, @no_of_passengers, unixepoch(@departure_date), @flight_number)');
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
        "price": Math.floor(Math.random() * 5000) + 5001,
        "currency": "EUR",
        "flight_number": generateFlightNumber(),
        // TODO: use user_id from session, if no session go to login?
        "user_id": 1,
        "departure_date": departure_date,
        "no_of_passengers": no_of_passengers,
    });
    //redirect('/about');
}

export default function ProposeTrip() {
    return (
        <div className="container mx-auto my-auto">
            <div className="w-full bg-center bg-cover h-[30rem]" style={{backgroundImage: 'url(/images/Hero.png)'}}>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold lg:text-4xl dark:text-gray-200"><span className="text-blue-400">Post</span> a travel route and <span className="text-blue-400">invite</span> people to join.</h1>
                        <form action={addTrip} className="">
                            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-4  md:grid-cols-2 xl:grid-cols-5">
                                <input type="text" name="departure" placeholder="From where?" required className="input input-bordered w-full max-w-xs mx-auto" />
                                <input type="text" name="destination" placeholder="Where to?" required className="input input-bordered w-full max-w-xs mx-auto" />
                                <select name="plane" defaultValue="" required className="input input-bordered w-full max-w-xs mx-auto" >
                                    <option value="" disabled>Select plane</option>
                                    <option value="cessna">Cessna</option>
                                </select>
                                <input type="date" name="departure_date" required className="input input-bordered w-full max-w-xs mx-auto" />
                                <input type="number" name="no_of_passengers" defaultValue="1" required className="input input-bordered w-full max-w-xs mx-auto" />
                            </div>
                            <div className="m-8">
                                <button type="submit" className="btn">Plan Flight</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <EmptyLegs />
        </div>
    );
}
