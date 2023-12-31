import { db } from "../../_utils/database";
import FlightForm from "../../components/flight/FlightForm";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

function getFlightData(id) {
  const flight = db
    .prepare(
      `
    SELECT departure, destination, price, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, no_of_passengers, flight_number, user_id, User.firstName as firstName, User.lastName as lastName, private_jet.image as plane_image_path, private_jet.name as plane_name, crew, private_jet.max_seats as max_seats, reservation_open
    FROM proposed_trip
    LEFT JOIN 'User'
    ON proposed_trip.user_id='User'.id 
    LEFT JOIN private_jet
    ON proposed_trip.plane_id=private_jet.id
    WHERE proposed_trip.id=?`
    )
    .get(id);
  return flight;
}

async function ProposedFlightsDetailedPage({ params }) {
  const flightData = getFlightData(params.id);
  const available_seats = flightData.max_seats - flightData.no_of_passengers;
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container px-6 pt-16 mx-auto">
        <div className="max-w-lg">
          <div className="flex gap-4">
            <button className="bg-black rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5 mb-5">
                <span>{flightData.date}</span>
            </button>
            <button className="bg-fuchsia-400 rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-fuchsia-600 duration-300 transition-colors border border-transparent px-8 py-2.5 mb-5">
                Proposed Trip
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Flight <span className="text-blue-500 ">{flightData.departure}</span>  to <span className="text-blue-500 ">{flightData.destination}</span>
          </h1> 
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Departure: {flightData.departure} Airport
          </p>
        </div>
      </div>
      <div className="container px-6 py-10 mx-auto">
        <div className="xl:flex xl:items-center xL:-mx-4">
          <div className="xl:w-2/3">
            <img
                className="object-cover w-full rounded-lg h-[360px]"
                src={`/images/destinations/${flightData.destination
                  .toLowerCase()
                  .replace(" ", "_")}.jpg`}
                alt={flightData.destination}
              />
          </div>
          <div className="grid grid-cols-1 gap-8 xl:gap-4 mt-8 xl:mt-0 xl:mx-4 xl:w-1/3 md:grid-cols-2">
            <div className="grid gap-3 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:row-end-6 lg:mb-0">
              <img className="hidden w-full h-full object-cover rounded-lg sm:block sm:h-52 sm:col-span-2 lg:col-span-full"
                          src={flightData.plane_image_path}
                          alt={flightData.plane_name} />
              <img src="/images/interior.jpg" alt="" className="hidden w-full h-48 object-cover rounded-lg md:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
              <img src="/images/pilot.jpg" alt="" className="hidden w-full h-48 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      <div className="container px-6 mx-auto">
        <div className=" lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl">
                Flight proposed by{" "}
                <span className="text-blue-500 ">{`${session.user.firstName} ${session.user.lastName}`}</span>
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {flightData.no_of_passengers}{" "}
                {flightData.no_of_passengers === 1 ? "Passenger" : "Passengers"}{" "}
                - {available_seats} {available_seats === 1 ? "Seat" : "Seats"}{" "}
                available - {flightData.crew} - 2h Flight
              </p>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <div className="lg:max-w-lg">
              <p className="text-xl font-semibold text-gray-800 dark:text-white lg:text-xl">
                Premium check-in
              </p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Free access to the airport lounge with premium facilities.
              </p>
            </div>
            <div className="lg:max-w-lg">
              <p className="text-xl font-semibold text-gray-800 dark:text-white lg:text-xl mt-3">
                Experienced traveler
              </p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                <span className="font-bold">{`${session.user.firstName} ${session.user.lastName}`}</span> already had 3 flights with us.
              </p>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <div className="lg:max-w-lg">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl">
                <span className="text-blue-500 ">Fly</span>Cover
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-400 font-bold cursor-pointer">
                Learn more
              </p>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <div className="lg:max-w-lg">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl">
                <span className="text-blue-500 ">Air</span>Dine
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Every booking includes complementary 3-course meal,
                based on your dietary preferences.
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-400 font-bold cursor-pointer">
                Learn more
              </p>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
          </div>
          <div className="flex justify-end w-full mt-6 lg:mt-0 lg:w-1/2 px-4">
            {flightData.reservation_open ? (
              session ? (
                <FlightForm
                  params={{
                    id: params.id,
                    price: flightData.price,
                    bookedSeats: flightData.no_of_passengers,
                    date: flightData.date,
                    available_seats: available_seats,
                  }}
                />
              ) : (
                <div className="text-center">
                  <h1 className="text-3xl font-bold lg:text-4xl dark:text-gray-200">
                    You need to be logged in to reserve a flight.
                  </h1>
                </div>
              )
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-bold lg:text-4xl dark:text-gray-200">
                  Reservation is closed for this flight. All seats are booked.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 xl:mt-12 px-6 pb-10">
        <div className="relative">
            <img className="object-cover w-full h-96 rounded-xl cursor-pointer"
            src={flightData.plane_image_path}
            alt={flightData.plane_name} />
            <div>
                <h1 className="text-3xl lg:text-8xl px-12 font-semibold text-white absolute top-12"><span className="text-3xl text-slate-800">Your plane is a:<br /></span>  {flightData.plane_name}</h1>
                <p className="text-xl px-12 font-semibold text-white absolute bottom-12">{flightData.plane_description}</p>
            </div>
        </div>
      </div>
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
          Frequently asked questions
        </h1>

        <div className="mt-8 space-y-8 lg:mt-12">
          <div className="collapse collapse-arrow p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <input type="radio" name="my-accordion-2" /> 

            <div className="collapse-title flex items-center justify-between w-full">
              <h1 className="font-semibold text-gray-700 dark:text-white">
                HOW LONG SHOULD I ARRIVE BEFORE DEPARTURE
              </h1>
            </div>
            <div className="collapse-content mt-6 text-sm text-gray-500 dark:text-gray-300">
              We advise our clients to arrive 15 to 20 minutes before the
              scheduled departure. Passengers should plan enough time to go
              through security, and customs if necessary.
            </div>
          </div>

          <div className="collapse collapse-arrow p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
          <input type="radio" name="my-accordion-2" /> 

            <div className="collapse-title flex items-center justify-between w-full">
              <h1 className="font-semibold text-gray-700 dark:text-white">
                CAN I CHANGE THE SCHEDULE OR THE ITINERARY OF MY FLIGHT
              </h1>
            </div>
            <div className="collapse-content mt-6 text-sm text-gray-500 dark:text-gray-300">
              Business aviation’s clients can change their flight departure time
              or even its destination. however additional fees may apply in some
              instances.
            </div>
          </div>

          <div className="collapse collapse-arrow p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
          <input type="radio" name="my-accordion-2" /> 

            <div className="collapse-title flex items-center justify-between w-full">
              <h1 className="font-semibold text-gray-700 dark:text-white">
                WHAT ARE YOUR CANCELLATION TERMS ?
              </h1>
            </div>
            <div className="collapse-content mt-6 text-sm text-gray-500 dark:text-gray-300">
              Our cancellation policy is stated in our offers as follows:
              <ul>
                <li>
                  30% of the flight amount if cancellation occurs after
                  confirmation of the flight
                </li>
                <li>
                  50% of flight amount if cancellation occurs less than 7 days
                  before the flight
                </li>
                <li>
                  80% of flight amount if cancellation occurs less than 48 hours
                  before the flight
                </li>
                <li>
                  100% of flight amount if cancellation occurs less than 24
                  hours before the flight
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposedFlightsDetailedPage;
