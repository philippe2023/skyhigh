"use client";
import { useState } from "react";

function FlightForm({ params: { price, bookedSeats, date, available_seats }}) {
  const [ guests, setGuests ] = useState(1);
  const pricePerPerson = (
    (price * 0.01) /
    (bookedSeats + guests)
  );
  const handleGuests = (e) => {
    setGuests(e.target.valueAsNumber);
  };
  return (
    <>
      <div className="m-4 text-xl">
        <p className="decoration-slate-500 text-slate-500">
          Total flight price € {(price*0.01).toFixed(2)}
        </p>
        <p className="text-white">--</p>
        <p className="">€ {pricePerPerson.toFixed(2)} per person</p>
      </div>
      <div className="m-4 mb-8 py-2 px-4 border-solid border-4 border-slate-400 rounded-lg">
        <p className="text-slate-400 text-sm">DEPARTURE DATE</p>
        <input
          type="date"
          value={date}
          disabled
          className="text-black text-base container mx-auto"
        />
        <p className="my-1 border-solid border-2 border-slate-400 rounded-lg"></p>
        <p className="text-slate-400 text-sm ">GUESTS</p>
        <input
          type="number"
          defaultValue="1"
          min="1"
          max={available_seats}
          name="guests"
          placeholder="How many?"
          onChange={handleGuests}
          required
          size="4"
          minength="4"
          className="container mx-auto text-black text-base"
        />
      </div>
      <div className="mx-4 my-2 text-base flex justify-between">
        <p className="">ticket price ({guests} {guests == 1 ? "Person" : "Persons"})</p>
        <p>€ {(pricePerPerson*guests).toFixed(2)}</p>
      </div>
      <div className="mx-4 my-2 text-base flex justify-between">
        <p>discount </p>
        <p>€ {(300).toFixed(2)}</p>
      </div>
      <div className="mx-4 my-2 text-base flex justify-between">
        <p>fees </p>
        <p>€ 0</p>
      </div>
      <div className="mx-4 my-2 border-solid border-2 border-slate-400 rounded-lg"></div>
      <div className="mx-4 my-2 text-base flex justify-between">
        <p>
          {" "}
          <span className="font-semibold">total</span> {guests} {guests == 1 ? "Person" : "Persons"}{" "}
        </p>
        <p className="font-semibold">€ {(pricePerPerson*guests-300).toFixed(2)}</p>
      </div>
    </>
  );
}

export default FlightForm;
