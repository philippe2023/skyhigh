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
    <div className="bg-white dark:bg-gray-900 container px-6 pt-16 mx-auto">
      <div className="mt-6 mb-16">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
          Congratulations! Your booking is set!
        </h1>
        <p className="mt-6 text-gray-500 dark:text-gray-300">
          A mere {calculateDaysUntilFlight(departure_date)} days until an exciting journey.
        </p>
        <p className="mt-6 text-gray-500 dark:text-gray-300">
          A confirmation-email has been sent to {session.user.email}.
        </p>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-3 max-md:grid-cols-1 container  mx-auto justify-between">
          <span className="container mx-auto text-left">
            You paid <span className="font-bold">€ {(bookingData.total_price * 0.01).toFixed(2)}</span>.
          </span>
          <span className="container mx-auto text-center max-md:text-left">
            {" "}
            <span className="font-bold">{bookingData.no_of_passengers}</span> {bookingData.no_of_passengers === 1 ? "seat" : "seats"}
          </span>
          <span className="container mx-auto text-right max-md:text-left">
            Your booking number: <span className="font-bold">X8R3Q2W7Y</span>
          </span>
        </div>

        <div className="py-5 grid grid-cols-5 gap-2 max-md:grid-cols-2">
          <div className="col-span-2 bg-slate-200 rounded-xl">
            <div className="p-5 grid grid-cols-2 gap-2">
              <div className=" grid grid-cols-1">
                <div className="text-right py-2">Departure</div>
                <img
                  className="w-12 mr-auto ml-auto"
                  src="/images/plane-departure-solid.svg"
                />
              </div>
              <div className="grid grid-cols-1">
                <div className="text-left py-2">Düsseldorf</div>
                <div className="text-left py-2">{departure_date.toDateString()}</div>
                <div className="text-left py-2">10:25 a.m.</div>
              </div>
            </div>
          </div>
          <div className="col-span-1 max-md:col-span-2 text-center align-middle  grid grid-cols-1">
            <div className="my-auto">40 minutes in the air</div>
            <img className="w-12 mx-auto" src="/images/plane-solid.svg" />
          </div>
          <div className="col-span-2 bg-slate-200 rounded-xl">
            <div className="p-5 grid grid-cols-2 gap-2">
              <div className=" grid grid-cols-1">
                <div className="text-right py-2">London</div>
                <div className="text-right py-2">{departure_date.toDateString()}</div>
                <div className="text-right py-2">11:05 a.m.</div>
              </div>
              <div className="grid grid-cols-1">
                <div className="text-left py-2">Arrival</div>
                <img
                  className="w-12 ml-auto mr-auto"
                  src="/images/plane-arrival-solid.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        className="object-cover w-full rounded-xl"
        src="https://assets.gulfstream.aero/thedotcom/images/aircraft/g700/d_g700_a_print_00085_PROD.jpg"
      />
    </div>
  );
}

export default Bookings;
