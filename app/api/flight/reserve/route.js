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
    "INSERT INTO booking (empty_leg_id, user_id, no_of_passengers) VALUES (@flight_id, @session_user_id, @no_of_passengers) RETURNING id"
  );
  // TODO: Figure out error handling
  // and returning from this api route
  // + handling client side, see FlightForm.js line 22
  const id = stmt.run({
    flight_id,
    session_user_id: session.user.id,
    no_of_passengers,
  });

  const bookingId = id.lastInsertRowid;
  // update available seats in empty_leg table
  const stmt2 = db.prepare(
    "UPDATE empty_leg SET available_seats = available_seats - @no_of_passengers WHERE id = @flight_id"
  );
  stmt2.run({ flight_id, no_of_passengers });
  // check if available_seats in empty_leg table are 0, if so set reservation_open to 0
  const stmt3 = db.prepare(
    "UPDATE empty_leg SET reservation_open = 0 WHERE id = @flight_id AND available_seats = 0"
  );
  stmt3.run({ flight_id });

  // TODO: error handling
  return NextResponse.json({ bookingId, success: true });
}
