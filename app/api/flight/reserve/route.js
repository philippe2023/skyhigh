import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { db } from "../../../_utils/database";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You need to be logged in to book a flight.");
  }
  const data = await request.formData();
  const no_of_passengers = data.get("guests");
  const flight_id = data.get("flight_id");
  const price = data.get("price");
  const currency = "EUR";
  const stmt = db.prepare(
    "INSERT INTO booking (empty_leg_id, user_id, no_of_passengers, total_price, currency) VALUES (@flight_id, @session_user_id, @no_of_passengers, @price, @currency) RETURNING id"
  );
  // TODO: Figure out error handling
  // and returning from this api route
  // + handling client side, see FlightForm.js line 22
  const id = stmt.run({
    flight_id,
    session_user_id: session.user.id,
    no_of_passengers,
    price,
    currency
  });

  const bookingId = id.lastInsertRowid;
  // update available seats in empty_leg table
  const stmt2 = db.prepare(
    "UPDATE empty_leg SET no_of_passengers = no_of_passengers + @no_of_passengers WHERE id = @flight_id"
  );
  stmt2.run({ flight_id, no_of_passengers });
  const { max_seats } = db
    .prepare(
      `SELECT private_jet.max_seats as max_seats
      FROM proposed_trip left join private_jet ON proposed_trip.plane_id=private_jet.id
      WHERE proposed_trip.id=?`
    )
    .get(flight_id);
  // check if no_of_passengers in empty_leg table cover all seats available in the plane
  const stmt3 = db.prepare(
    "UPDATE empty_leg SET reservation_open = 0 WHERE id = @flight_id AND no_of_passengers = @max_seats"
  );
  stmt3.run({ flight_id, max_seats });

  // TODO: error handling
  return NextResponse.json({ bookingId });
}
