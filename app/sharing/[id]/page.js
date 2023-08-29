import { db } from "../../_utils/database";
import FlightForm from "../../components/flight/FlightForm";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

function getFlightData(id) {
  const flight = db
    .prepare(
    `
    SELECT departure, destination, price, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date, no_of_passengers, flight_number, user_id, User.name as userName, private_jet.image as plane_image_path, private_jet.name as plane_name, crew, private_jet.max_seats, private_jet.max_seats as max_seats, reservation_open
    FROM proposed_trip
    LEFT JOIN 'User'
    ON proposed_trip.user_id='User'.id 
    left join private_jet
    ON proposed_trip.plane_id=private_jet.id
    WHERE proposed_trip.id=?`
    )
    .get(id);
  return flight;
}

async function reserve(data) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("You need to be logged in to book a flight.");
    }
    const no_of_passengers = data.get("guests");
    const flight_id = data.get("flight_id");
    const stmt = db.prepare(
      "INSERT INTO booking (proposed_trip_id, user_id, no_of_passengers) VALUES (@flight_id, @session_user_id, @no_of_passengers) RETURNING id"
    );
    const id = stmt.run({
      flight_id,
      session_user_id: session.user.id,
      no_of_passengers,
    });
    const bookingId = id.lastInsertRowid;

    // update no_of_passengers in proposed_trip table
    const stmt2 = db.prepare(
      "UPDATE proposed_trip SET no_of_passengers = no_of_passengers + @no_of_passengers WHERE id = @flight_id"
    );
    stmt2.run({ flight_id, no_of_passengers });
    // check if no_of_passengers in proposed_trip table cover all seats available in the plane
    const {max_seats} = db.prepare(`SELECT private_jet.max_seats as max_seats
    FROM proposed_trip left join private_jet ON proposed_trip.plane_id=private_jet.id
    WHERE proposed_trip.id=?`).get(flight_id);
    const stmt3 = db.prepare(
      "UPDATE proposed_trip SET reservation_open = 0 WHERE id = @flight_id AND no_of_passengers = @max_seats"
    );
    stmt3.run({ flight_id, max_seats });
    redirect(`/bookings/${bookingId}`);
  }

async function ProposedFlightsDetailedPage({ params }) {
  const flightData = getFlightData(params.id);
  const available_seats = flightData.max_seats - flightData.no_of_passengers;
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container px-6 pt-16 mx-auto">
        <div className="max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            {flightData.date} {flightData.departure} - {flightData.destination}
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            {flightData.departure} Airport
          </p>
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto">
        <div className="xl:flex xl:items-center xL:-mx-4">
          <div className="xl:w-2/3">
            <img
              className="object-cover w-full h-[490px] rounded-xl"
              src={flightData.plane_image_path}
              alt={flightData.plane_name}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 xl:gap-4 mt-8 xl:mt-0 xl:mx-4 xl:w-1/3 md:grid-cols-2">
            <div>
              <img
                className="object-cover rounded-xl aspect-square h-[490px]"
                src={`/images/destinations/${flightData.departure
                  .toLowerCase()
                  .replace(" ", "_")}.jpg`}
                alt={flightData.departure}
              />
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
                <span className="text-blue-500 ">{flightData.userName}</span>
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {flightData.no_of_passengers}{" "}
                {flightData.no_of_passengers === 1 ? "Passenger" : "Passengers"}{" "}
                - {available_seats} {available_seats === 1 ? "Seat" : "Seats"}{" "}
                available - {flightData.crew} - 2h Flight
              </p>
              <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Contact the host
              </button>
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
                Jack already had 3 flights with us.
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
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Learn more
              </p>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
          </div>
          <div className="flex justify-end w-full mt-6 lg:mt-0 lg:w-1/2 px-4">
            {flightData.reservation_open ? (
              session ? (
                <form
                  action={reserve}
                  className="px-4 mx-4 border-solid border-4 border-slate-200 rounded-lg"
                >
                  <FlightForm
                    params={{
                        price: flightData.price,
                        bookedSeats: flightData.no_of_passengers,
                        date: flightData.date,
                        available_seats: available_seats
                    }}
                  />
                  <input type="hidden" name="flight_id" value={params.id} />
                  <button
                    type="submit"
                    className="container mx-auto mt-8 mb-2 py-4 text-2xl flex justify-center bg-black text-white rounded-lg"
                  >
                    Reserve
                  </button>
                  <p className="flex justify-center text-sm">
                    You won't be charged yet!
                  </p>
                </form>
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

      <div className="container px-6 mx-auto text-center">
        <div className="flex justify-center mt-10">
          <img
            className="object-cover w-full h-96 rounded-xl"
            src="https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80"
          />
        </div>
      </div>

      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
          Frequently asked questions
        </h1>

        <div className="mt-8 space-y-8 lg:mt-12">
          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button className="flex items-center justify-between w-full">
              <h1 className="font-semibold text-gray-700 dark:text-white">
                HOW LONG SHOULD I ARRIVE BEFORE DEPARTURE
              </h1>

              <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>
            </button>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              We advise our clients to arrive 15 to 20 minutes before the
              scheduled departure. Passengers should plan enough time to go
              through security, and customs if necessary.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button className="flex items-center justify-between w-full">
              <h1 className="font-semibold text-gray-700 dark:text-white">
                CAN I CHANGE THE SCHEDULE OR THE ITINERARY OF MY FLIGHT
              </h1>

              <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>
            </button>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Business aviation’s clients can change their flight departure time
              or even its destination. however additional fees may apply in some
              instances.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button className="flex items-center justify-between w-full">
              <h1 className="font-semibold text-gray-700 dark:text-white">
                WHAT ARE YOUR CANCELLATION TERMS ?
              </h1>

              <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>
            </button>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-300">
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
