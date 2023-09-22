"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

function FlightForm({
  params: { id, price, bookedSeats, date, available_seats },
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  let reservationApiURL = "/api/flight/reserve";
  if (pathname.startsWith('/sharing')) {
    reservationApiURL = "/api/sharing/reserve";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    setIsLoading(true);
    const data = new FormData(event.target);

    
    const response = await fetch(reservationApiURL, {
      method: "POST",
      body: data,
    });
    const { bookingId } = await response.json();
    // TODO: figure out how to handle errors
   
    // This redirect somehow has an Unhandled Runtime Error 'Error: NEXT_REDIRECT'
    // redirect(`/bookings/${bookingId}`);
    router.push(`/bookings/${bookingId}`);
  };

  const [guests, setGuests] = useState(1);
  const pricePerPerson = (price * 0.01) / (bookedSeats + guests);
  const totalPrice = pricePerPerson * guests;
  const discount = 300;
  const handleGuests = (e) => {
    const newValue = e.target.valueAsNumber;
    // Check if newValue is NaN (not a number)
    if (isNaN(newValue)) {
      setGuests(1); // Set a default value of 1
    } else {
      setGuests(newValue);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 mx-4 border-solid border-2 border-slate-200 rounded-lg"
    >
      <div className="m-4 text-xl">
        <p className="text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl">
          Total flight price <span className="text-blue-500 ">€ {(price * 0.01).toFixed(2)} </span>
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-400">--</p>
        <p className="mt-3 text-gray-600 dark:text-gray-400">€ {pricePerPerson.toFixed(2)} per person</p>
      </div>
      <div className="md:m-4 mb-8 px-4 border-solid border-2 border-slate-200 rounded-lg">
        <p className="mt-3 text-gray-600 dark:text-gray-400">DEPARTURE DATE</p>
        <input
          type="date"
          value={date}
          disabled
          className="bg-white text-gray-800 dark:text-white text-base container mx-auto my-3 dark:bg-slate-800 px-5 py-1 rounded-md"
        />
        <hr className="my-1 border-solid border-2 border-slate-200 rounded-lg" />
        <p className="mt-3 text-gray-600 dark:text-gray-400">GUESTS</p>
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
          className="bg-white text-gray-800 dark:text-white text-base container mx-auto my-3 dark:bg-slate-800 px-6 py-1 rounded-md"
        />
      </div>
      <div className="mt-3 text-gray-600 dark:text-gray-400 px-4 flex justify-between">
        <p className="">
          ticket price ({guests} {guests == 1 ? "Person" : "Persons"})
        </p>
        <p>€ {(totalPrice).toFixed(2)}</p>
      </div>
      <div className="mt-3 text-gray-600 dark:text-gray-400 px-4 flex justify-between">
        <p>discount </p>
        <p>€ {(discount).toFixed(2)}</p>
      </div>
      <div className="mt-3 text-gray-600 dark:text-gray-400 px-4 flex justify-between">
        <p>fees </p>
        <p>€ 0</p>
      </div>
      <hr className="mt-6 border-gray-200 dark:border-gray-700" />
            <div className="mx-4 my-2 text-base flex justify-between">
        <p className="mt-3 text-blue-600 font-semibold">
          {" "}
          <span className="text-gray-600 dark:text-gray-400 ">total</span> {guests}{" "}
          {guests == 1 ? "Person" : "Persons"}{" "}
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-400 font-semibold">
          € {(totalPrice - discount).toFixed(2)}
        </p>
      </div>
      <input type="hidden" name="flight_id" value={id} />
      <input type="hidden" name="price" value={totalPrice - discount} />
      <button
        type="submit"
        className="container mx-auto mt-8 mb-2 py-4 text-2xl flex justify-center bg-black text-white rounded-lg sm:text-base items-center gap-x-3 hover:bg-black/80 duration-300 transition-colors border border-transparent px-8"
        disabled={submitDisabled}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Reserve"
        )}
      </button>
      <p className="flex justify-center text-sm my-3 text-blue-600">You won't be charged yet!</p>
    </form>
  );
}

export default FlightForm;
