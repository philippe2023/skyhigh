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
  const { max_seats } = db
    .prepare(
      `SELECT private_jet.max_seats as max_seats
      FROM proposed_trip left join private_jet ON proposed_trip.plane_id=private_jet.id
      WHERE proposed_trip.id=?`
    )
    .get(flight_id);
  const stmt3 = db.prepare(
    "UPDATE proposed_trip SET reservation_open = 0 WHERE id = @flight_id AND no_of_passengers = @max_seats"
  );
  stmt3.run({ flight_id, max_seats });
  return NextResponse.json({ bookingId });
}
