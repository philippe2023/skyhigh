import {db} from "../../_utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";

function getBookingsByUser(id) {
    const bookings = db.prepare(`
        SELECT
            booking.id as id, departure, destination,
            substr('JanFebMarAprMayJunJulAugSepOctNovDec', 1 + 3*STRFTIME('%m', departure_date, 'unixepoch'), -3) || STRFTIME(' %d, %Y', departure_date, 'unixepoch')  AS date
        FROM booking
        JOIN
            proposed_trip ON booking.proposed_trip_id=proposed_trip.id
        WHERE
            booking.user_id=?
        UNION ALL
        SELECT
            booking.id as id, departure, destination,
            substr('JanFebMarAprMayJunJulAugSepOctNovDec', 1 + 3*STRFTIME('%m', departure_date, 'unixepoch'), -3) || STRFTIME(' %d, %Y', departure_date, 'unixepoch')  AS date
        FROM booking
        JOIN empty_leg ON booking.empty_leg_id=empty_leg.id
        WHERE
            booking.user_id=?
        ORDER BY date;
    `).all(id,id);
    return bookings;
}

async function Profile() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className="container mx-auto my-auto">
                <div className="w-full bg-center bg-cover h-[30rem]" style={{backgroundImage: 'url(/images/Hero.png)'}}>
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold lg:text-4xl dark:text-gray-200">You need to be logged in to view this page.</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const bookings = getBookingsByUser(session.user.id);

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="flex flex-col items-center p-8 transition-colors duration-300 transform group rounded-xl">
                <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src="/images/avatar.jpg" alt="profile picture" />

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-white group-hover:text-blue-600">{session.user.firstName} {session.user.lastName}</h1>

                <p className="mt-2 text-gray-500 dark:text-gray-300 group-hover:text-blue-600">{session.user.email}</p>
                </div>

                <div className="flex items-center justify-center gap-6">
                    <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Explore my <span class="text-blue-500">Flights</span></h1>

                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 my-3 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Destination</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Departure Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Airport
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Plane
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">More</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <Link href={`/bookings/${booking.id}`}>
                                                        <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-green-100 rounded-full dark:bg-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 sm:h-9 sm:w-9" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        </Link>
                                                        
                                                        <div>
                                                            <h2 className="font-normal text-gray-800 dark:text-white ">Flight To <span className="text-blue-600 font-semibold">{booking.destination}</span></h2>
                                                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400">from {booking.departure}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-green-500">
                                                Confirmed
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{booking.date}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{booking.departure} Airport</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">GolfStream 500</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="dropdown dropdown-end">
                                                    <button tabIndex={0} className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                    </svg></button>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-gray-500 rounded-box w-36">
                                                        <li><Link href={`/bookings/${booking.id}`}>Booking Details</Link></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
                        <Link href="/flights">
                            <button className="btn px-4 py-2 text-sm font-medium text-white capitalize bg-blue-600 hover:bg-blue-500 md:py-3 rounded-xl md:px-12">Find Empty Legs</button>
                        </Link>
                    </div>
                    <div className="flex items-center p-1 border border-green-500 dark:border-green-500 rounded-xl">
                        <Link href="/sharing">
                            <button className="btn px-4 py-2 text-sm font-medium text-white capitalize bg-green-500 hover:bg-green-600 md:py-3 rounded-xl md:px-12">Find Proposed Flights</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;
