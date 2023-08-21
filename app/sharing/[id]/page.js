import { db } from "../../_utils/database";

function getFlightData(id) {
    const flight = db.prepare("SELECT departure, destination, price, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, no_of_passengers, flight_number, user_id from proposed_trip WHERE id=?").get(id);
    return flight;
}

function getUserData(id) {
    const user = db.prepare("SELECT name from User WHERE id=?").get(id);
    return user;
}

function ProposedFlightsDetailedPage({params}) {
    const flightData = getFlightData(params.id);
    const userData = getUserData(flightData.user_id);
    let price = (flightData.price).toString();
    price = price.slice(0,-2) + "," + price.slice(-2);

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 pt-16 mx-auto">
                <div className="max-w-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">{flightData.date} {flightData.departure} - {flightData.destination}</h1>
                    <p className="mt-6 text-gray-500 dark:text-gray-300">{flightData.departure} Airport</p>
                </div>
            </div>

            <div className="container px-6 py-10 mx-auto">
                <div className="xl:flex xl:items-center xL:-mx-4"> 
                    <div className="xl:w-2/3">
                        <img className="object-cover w-full h-[490px] rounded-xl" src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80" />
                    </div>
                    <div className="grid grid-cols-1 gap-8 xl:gap-4 mt-8 xl:mt-0 xl:mx-4 xl:w-1/3 md:grid-cols-2">
                        <div>
                            <img className="object-cover rounded-xl aspect-square" src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80" alt="" />
                        </div>
                        <div>
                            <img className="object-cover rounded-xl aspect-square" src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80" alt="" />
                        </div>
                        <div>
                            <img className="object-cover rounded-xl aspect-square" src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80" alt="" />
                        </div>
                        <div>
                            <img className="object-cover rounded-xl aspect-square" src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-6 mx-auto">
                <div className=" lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl">Flight proposed by <span className="text-blue-500 ">{userData.name}</span></h1>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">{flightData.no_of_passengers} {flightData.no_of_passengers === 1 ? 'Passenger' : 'Passengers'} - 1 Flight attendant - 2h Flight</p>
                            <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Contact the host</button>
                        </div>
                        <hr className="my-6 border-gray-200 dark:border-gray-700" />
                        <div className="lg:max-w-lg">
                            <p className="text-xl font-semibold text-gray-800 dark:text-white lg:text-xl">Premium check-in</p>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">Free access to the airport lounge with premium facilities.</p>
                        </div>
                        <div className="lg:max-w-lg">
                            <p className="text-xl font-semibold text-gray-800 dark:text-white lg:text-xl mt-3">Experienced traveler</p>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">Jack already had 3 flights with us.</p>
                        </div>
                        <hr className="my-6 border-gray-200 dark:border-gray-700" />
                        <div className="lg:max-w-lg">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl"><span className="text-blue-500 ">Fly</span>Cover</h1>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">Learn more</p>
                        </div>
                        <hr className="my-6 border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="flex justify-end w-full mt-6 lg:mt-0 lg:w-1/2 px-4">
                        <form className="px-4 mx-4 border-solid border-4 border-slate-200 rounded-lg">
                            <div className="m-4 text-xl">
                                <p className="decoration-slate-500 text-slate-500">Flight price € {price}</p>
                                <p className="text-white">--</p>
                                <p className=""> € 850 per person</p>
                            </div>
                            <div className="m-4 mb-8 py-2 px-4 border-solid border-4 border-slate-400 rounded-lg">
                                <p className="text-slate-400 text-sm">CHECK-IN</p>
                                <input type="date" name="checkindate" placeholder="When?" required className="text-black text-base container mx-auto" />
                                <p className="my-1 border-solid border-2 border-slate-400 rounded-lg"></p>
                                <p className="text-slate-400 text-sm ">GUESTS</p>
                                <input type="number" min="1" max="5" name="GUESTS" placeholder="How many?" required size="4" minLength="4" className="container mx-auto text-black text-base" />
                            </div>
                            <div className="mx-4 my-2 text-base flex justify-between">
                                <p className="">ticket price (2 persons)</p>
                                <p>€ 1700</p>
                            </div>
                            <div className="mx-4 my-2 text-base flex justify-between">
                                <p>discount </p>
                                <p>€ 300</p>
                            </div>
                            <div className="mx-4 my-2 text-base flex justify-between">
                                <p>fees </p>
                                <p>€ 0</p>
                            </div>
                            <div className="mx-4 my-2 border-solid border-2 border-slate-400 rounded-lg"></div>
                            <div className="mx-4 my-2 text-base flex justify-between">
                                <p>  <span className="font-semibold">total</span> 2 persons </p>
                                <p className="font-semibold">€ 1400</p>
                            </div>   
                            <button type="submit" className="container mx-auto mt-8 mb-2 py-4 text-2xl flex justify-center bg-black text-white rounded-lg">Reserve</button>
                            <p className="flex justify-center text-sm">You won't be charged yet!</p>                 
                        </form>                    
                    </div>
                </div>
            </div>

            <div className="container px-6 mx-auto text-center">
                <div className="flex justify-center mt-10">
                    <img className="object-cover w-full h-96 rounded-xl" src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80" />
                </div>
            </div>

            <div className="container px-6 py-12 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Frequently asked questions</h1>

                <div className="mt-8 space-y-8 lg:mt-12">
                    <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
                        <button className="flex items-center justify-between w-full">
                            <h1 className="font-semibold text-gray-700 dark:text-white">HOW LONG SHOULD I ARRIVE BEFORE DEPARTURE
                            </h1>

                            <span className="text-gray-400 bg-gray-200 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                                </svg>
                            </span>
                        </button>

                        <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                            We advise our clients to arrive 15 to 20 minutes before the scheduled departure. Passengers should plan enough time to go through security, and customs if necessary.
                        </p>
                    </div>

                    <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
                        <button className="flex items-center justify-between w-full">
                            <h1 className="font-semibold text-gray-700 dark:text-white">CAN I CHANGE THE SCHEDULE OR THE ITINERARY OF MY FLIGHT

                            </h1>

                            <span className="text-gray-400 bg-gray-200 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                                </svg>
                            </span>
                        </button>

                        <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                        Business aviation’s clients can change their flight departure time or even its destination. however additional fees may apply in some instances.
                        </p>
                    </div>

                <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <button className="flex items-center justify-between w-full">
                        <h1 className="font-semibold text-gray-700 dark:text-white">WHAT ARE YOUR CANCELLATION TERMS ?
                        </h1>

                        <span className="text-gray-400 bg-gray-200 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                            </svg>
                        </span>
                    </button>

                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                    Our cancellation policy is stated in our offers as follows:
                        <ul>
                            <li>30% of the flight amount if cancellation occurs after confirmation of the flight</li>
                            <li>50% of flight amount if cancellation occurs less than 7 days before the flight</li>
                            <li>80% of flight amount if cancellation occurs less than 48 hours before the flight</li>
                            <li>100% of flight amount if cancellation occurs less than 24 hours before the flight</li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
    </div>
    );
}

export default ProposedFlightsDetailedPage;