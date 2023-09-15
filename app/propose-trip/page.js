import { db } from "../_utils/database";
import EmptyLegs from "../components/flight/emptyLegs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

function generateFlightNumber() {
	const airline = String.fromCharCode(
		65 + Math.floor(Math.random() * 26),
		65 + Math.floor(Math.random() * 26)
	);
	const number = Math.floor(Math.random() * 9999) + 1;
	return airline + " " + number;
}

function persistToDb(data) {
	const stmt = db.prepare(
		"INSERT INTO proposed_trip (departure, destination, price, currency, user_id, no_of_passengers, departure_date, flight_number, plane_id) VALUES (@departure, @destination, @price, @currency, @user_id, @no_of_passengers, unixepoch(@departure_date), @flight_number, @plane_id) RETURNING id"
	);
	const id = stmt.run(data);
	return id.lastInsertRowid;
}

function getPlanes() {
	const stmt = db.prepare("SELECT id, name from private_jet");
	return stmt.all();
}

class AtomicState {
	constructor(message = undefined) {
		this.message = message;
	}
	setMessage(message) {
		this.message = message;
	}
	getMessage() {
		const message = this.message;
		this.message = undefined;
		return message;
	}
}

const state = new AtomicState();

async function addTrip(data) {
	"use server";
	const errors = new Map();
	let departure = "";
	let destination = "";
	let plane = 0;
	let departure_date = null;
	let no_of_passengers = 0;

	// build error
	if ((departure = data.get("departure")).trim() === "") {
		errors.set("departure", "Missing departure");
	}
	if ((destination = data.get("destination")).trim() === "") {
		errors.set("destination", "Missing destination");
	}
	if (!(plane = data.get("plane"))) {
		errors.set("plane", "Missing plane");
	}
	if ((departure_date = data.get("departure_date")) === null) {
		errors.set("departure_date", "Missing departure date");
	}
	if ((no_of_passengers = data.get("no_of_passengers")) === 0) {
		errors.set("no_of_passengers", "Trip needs at least 1 passenger");
	}

	// return errors to client
	if (errors.size > 0) {
		state.setMessage(errors);
		revalidatePath("/propose-trip");
	} else {
		const id = persistToDb({
			departure: departure,
			destination: destination,
			price: Math.floor(Math.random() * 500000) + 500001,
			currency: "EUR",
			flight_number: generateFlightNumber(),
			user_id: data.get("user_id"),
			departure_date: departure_date,
			no_of_passengers: no_of_passengers,
			plane_id: plane,
		});
		redirect(`/sharing/${id}`);
	}
}

// TODO: Fix mobile layout
// TODO: Fix error messages showing up when re-navigating to page
export default async function ProposeTrip() {
	const planes = getPlanes();
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div className="container mx-auto my-auto">
				<div className="w-full bg-center bg-cover h-[30rem]" style={{ backgroundImage: 'url(/images/Hero.png)' }}>
					<div className="flex items-center justify-center w-full h-full">
						<div className="text-center">
							<h1 className="text-3xl font-bold lg:text-4xl dark:text-gray-200">You need to be logged in to propose a trip.</h1>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	const errors = state.getMessage();

	return (
		<div className="container mx-auto my-auto">
			<div
				className="w-full bg-center bg-cover h-[30rem]"
				style={{ backgroundImage: "url(/images/Hero.png)" }}
			>
				<div className="flex items-center justify-center w-full h-full">
					<div className="text-center">
						{errors && (
							<div>
								{Array.from(errors.values(), msg => 
									<div className="alert alert-error mt-3" key={msg}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="stroke-current shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>{msg}</span>
								</div>
								)}
							</div>
						)}
						<h1 className="sm:pt-16 text-3xl font-semibold lg:text-4xl dark:text-gray-200">
							<span className="text-blue-400">Post</span> a travel route and{" "}
							<span className="text-blue-400">invite</span> people to join.
						</h1>
						<form action={addTrip} className="">
							<input type="hidden" name="user_id" value={session.user.id} />
							<div className="max-w-8xl grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-4  md:grid-cols-2 xl:grid-cols-5 dark:text-white">
								<label>
									<div className="md:text-left sm:text-center">Departure</div>
									<input
										type="text"
										name="departure"
										placeholder="From where?"
										required
										className="input input-bordered w-full max-w-xs mx-auto mt-2 dark:bg-slate-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</label>
								<label>
									<div className="md:text-left sm:text-center">Destination</div>	
									<input
										type="text"
										name="destination"
										placeholder="Where to?"
										required
										className="input input-bordered w-full max-w-xs mx-auto mt-2 dark:bg-slate-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</label>
								<label>
									<div className="md:text-left sm:text-center">Plane</div>
									<select
										name="plane"
										defaultValue=""
										required
										className="input input-bordered w-full max-w-xs mx-auto mt-2 dark:bg-slate-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									>
										<option value="" disabled>
											Select plane
										</option>
										{planes.map(plane => (
											<option key={plane.id} value={plane.id}>{plane.name}</option>
										))}
									</select>
								</label>
								<label>
									<div className="md:text-left sm:text-center">Departure date</div>
									
									<input
										type="date"
										name="departure_date"
										required
										className="input input-bordered w-full max-w-xs mx-auto mt-2 dark:bg-slate-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</label>
								<label>
									<div className="md:text-left sm:text-center">Number of passengers</div>
									<input
										type="number"
										name="no_of_passengers"
										defaultValue="1"
										min="1"
										required
										className="input input-bordered w-full max-w-xs mx-auto mt-2 dark:bg-slate-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</label>
							</div>
							<div className="m-8">
								<button type="submit" className="btn">
									Plan Flight
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<EmptyLegs />
		</div>
	);
}
