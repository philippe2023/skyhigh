import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { db } from "../../_utils/database";

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function calculateDaysUntilFlight(flightDate) {
  const today = new Date();
  const daysDifference = dateDiffInDays(today, flightDate);
  return Math.abs(daysDifference);
}

function getBookingData(id, userId) {
  const booking = db.prepare(`SELECT
  b.no_of_passengers,
  b.total_price,
  COALESCE(el.departure, pt.departure) AS departure,
  COALESCE(el.destination, pt.destination) AS destination,
  COALESCE(el.departure_date, pt.departure_date) AS departure_date,
  COALESCE(el.flight_number, pt.flight_number) AS flight_number
FROM booking AS b
LEFT JOIN empty_leg AS el ON b.empty_leg_id = el.id
LEFT JOIN proposed_trip AS pt ON b.proposed_trip_id = pt.id
WHERE b.id=? and b.user_id=?;`).get(id, userId);
  return booking;
}

async function Bookings({ params }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return (
      <div className="container mx-auto my-auto">
        <div
          className="w-full bg-center bg-cover h-[30rem]"
          style={{ backgroundImage: "url(/images/Hero.png)" }}
          >
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <h1 className="text-3xl font-bold lg:text-4xl dark:text-gray-200">
                You need to be logged in to view this page.
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const bookingData = getBookingData(params.id, session.user.id);
  const departure_date = new Date(bookingData.departure_date*1000);

  return (
    <div className="md:px-12">


      <section className="bg-white dark:bg-gray-900">
          <div className="relative flex">
              <div className="min-h-screen lg:w-1/3"></div>
              <div className="hidden w-3/4 min-h-screen lg:block"></div>

              <div className="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
                  <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                      Congratulations <span className="text-blue-500">{`${session.user.firstName} ${session.user.lastName}`}</span>! <br /> Your booking is set!
                  </h1>

                  <div className="mt-10 lg:flex lg:items-center">
                      <img className="object-cover object-top-left w-full lg:w-[32rem] rounded-lg h-96" src="/images/destinations/miami.jpg" alt="destination" />

                      <div className="mt-6 lg:px-10 lg:mt-12">
                          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:w-full">
                              A mere {calculateDaysUntilFlight(departure_date)} days until an exciting journey.
                          </h1>

                          <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-200">
                              <span className="font-semibold">{`${session.user.firstName} ${session.user.lastName}`}</span>, a confirmation-email has been sent to <span className="font-bold">{session.user.email}</span>.

                          </p>

                          <div className="py-12">
                            <div className="grid grid-cols-3 max-md:grid-cols-1 container  mx-auto justify-between">
                              <span className="container mx-auto text-left text-gray-600 dark:text-white">
                                You paid <span className="font-bold">€ {(bookingData.total_price * 0.01).toFixed(2)}</span>.
                              </span>
                              <span className="container mx-auto text-center max-md:text-left text-gray-600 dark:text-white">
                                {" "}
                                <span className="font-bold">{bookingData.no_of_passengers}</span> {bookingData.no_of_passengers === 1 ? "seat" : "seats"}
                              </span>
                              <span className="container mx-auto text-right max-md:text-left text-gray-600 dark:text-white">
                                Your booking number: <span className="font-bold">X8R3Q2W7Y</span>
                              </span>
                            </div>
                    
                            <div className="py-5 grid grid-cols-5 gap-2 max-md:grid-cols-2">
                              <div className="col-span-2 bg-slate-200 rounded-xl">
                                <div className="p-5 grid grid-cols-2 gap-2">
                                  <div className=" grid grid-cols-1 relative">
                                    <div className="absolute left-0 p-2  text-gray-600 font-bold">Departure</div>
                                    <img
                                      className="w-12 mr-auto ml-auto absolute left-3 bottom-8"
                                      src="/images/plane-departure-solid.svg"
                                    />
                                  </div>
                                  <div className="grid grid-cols-1">
                                    <div className="text-left py-2 text-blue-600 font-semibold">{bookingData.departure}</div>
                                    <div className="text-left py-2 text-gray-600">{departure_date.toDateString()}</div>
                                    <div className="text-left py-2 text-gray-600">10:25 a.m.</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-1 max-md:col-span-2 text-center align-middle  grid grid-cols-1">
                                <div className="my-auto text-gray-600 dark:text-white">40 minutes in the air</div>
                                <img className="w-12 mx-auto" src="/images/plane-solid.svg" />
                              </div>
                              <div className="col-span-2 bg-slate-200 rounded-xl">
                                <div className="p-5 grid grid-cols-2 gap-0">
                                  <div className=" grid grid-cols-1">
                                    <div className="text-right py-2 text-blue-600 font-semibold">{bookingData.destination}</div>
                                    <div className="text-right py-2 text-gray-600">{departure_date.toDateString()}</div>
                                    <div className="text-right py-2 text-gray-600">11:05 a.m.</div>
                                  </div>
                                  <div className="grid grid-cols-1 relative">
                                    <div className="absolute right-0 p-2 text-gray-600 font-bold">Arrival</div>
                                    <img
                                      className="w-12 ml-auto mr-auto absolute right-3 bottom-8"
                                      src="/images/plane-arrival-solid.svg"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <img
        className="object-cover w-full rounded-xl h-96 px-6 md:pl-10"
        src="https://assets.gulfstream.aero/thedotcom/images/aircraft/g700/d_g700_a_print_00085_PROD.jpg"
      />
    </div>
  );
}

export default Bookings;
