import { db } from "../../_utils/database";
import FlightForm from "../../components/flight/FlightForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

function getFlightData(id) {
  const flight = db
    .prepare(
      "SELECT departure, destination, price, STRFTIME('%Y-%m-%d', departure_date, 'unixepoch') AS date,max_seats, available_seats, flight_number, reservation_open from empty_leg WHERE id=?"
    )
    .get(id);
  return flight;
}

async function Flights({ params }) {
  const flightData = getFlightData(params.id);
  const bookedSeats = flightData.max_seats - flightData.available_seats;
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
              src="/images/jets/Cessna_Citation_M2.jpg"
            />
          </div>
          <div className="grid grid-cols-1 gap-8 xl:gap-4 mt-8 xl:mt-0 xl:mx-4 xl:w-1/3 md:grid-cols-2">
            <div>
              <img
                className="object-cover rounded-xl aspect-square h-[490px]"
                src={`/images/destinations/${flightData.destination
                  .toLowerCase()
                  .replace(" ", "_")}.jpg`}
                alt={flightData.destination}
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
                Empty Leg by <span className="text-blue-500 ">FlyAway LLC</span>
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {bookedSeats} {bookedSeats === 1 ? "Passenger" : "Passengers"} -{" "}
                {flightData.available_seats}{" "}
                {flightData.available_seats === 1 ? "Seat" : "Seats"} available
                - 1 Flight attendant - 2h Flight
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
                <FlightForm
                    params={{
                      id: params.id,
                      price: flightData.price,
                      bookedSeats: bookedSeats,
                      date: flightData.date,
                      available_seats: flightData.available_seats,
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

export default Flights;
