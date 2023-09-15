"use client";
import EmptyLegCard from "./emptyLegCardDetail";
import { useState } from "react";

export default function FlightFilter({ flights, destination }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  "test".slice(0, 3).startsWith("tes");
  const [flightsToShow, setFlightsToShow] = useState(destination ? flights.filter((e) => e.destination.startsWith(destination)) : flights);

  const handleFlightCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    switch (category) {
      case "all":
        setFlightsToShow(flights);
        break;
      case "empty_leg":
        const emptyLegs = flights.filter((e) => e.flight_category === "empty_leg");
        setFlightsToShow(emptyLegs);
        break;
      case "sharing":
        const sharedFlights = flights.filter((e) => e.flight_category === "sharing");
        setFlightsToShow(sharedFlights);
        break;
      default:
        break;
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center my-5">
        <div className="flex items-center p-1 gap-6">
          <div className="form-control flex items-center p-1 w-48 bg-blue-900 border border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-700 btn">
            <label className="label cursor-pointer">
              <span className="label-text text-white font-bold">All</span>
              <input
                type="radio"
                name="flight_category"
                value="all"
                checked={selectedCategory === "all"}
                className="radio ml-2 hidden"
                onChange={handleFlightCategoryChange}
              />
            </label>
          </div>
          <div className="form-control flex items-center p-1 w-48 bg-blue-900 border border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-700 btn">
            <label className="label cursor-pointer">
              <span className="label-text text-white font-bold">Empty Leg</span>
              <input
                type="radio"
                name="flight_category"
                value="empty_leg"
                checked={selectedCategory === "empty_leg"}
                className="radio ml-2 hidden"
                onChange={handleFlightCategoryChange}
              />
            </label>
          </div>
          <div className="form-control flex items-center p-1 w-48 bg-blue-900 border border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-700 btn">
            <label className="label cursor-pointer">
              <span className="label-text text-white font-bold">Sharing</span>
              <input
                type="radio"
                name="flight_category"
                value="sharing"
                checked={selectedCategory === "sharing"}
                className="radio ml-2 hidden"
                onChange={handleFlightCategoryChange}
              />
            </label>
          </div>
        </div>
      </div>

      {flightsToShow.map((e) => (
        <EmptyLegCard key={e.id+e.flight_category} flight={e} />
      ))}
    </div>
  );
}
