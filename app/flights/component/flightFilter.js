"use client";
import EmptyLegCard from "./emptyLegCardDetail";
import { useState } from "react";

function combinedFilter(flight, destination, flightCategory) {
  if (flightCategory === "all" && !destination) {
    return true;
  }
  if (flightCategory !== "all") {
    return flight.destination.startsWith(destination) && flight.flight_category === flightCategory;
  }

  return flight.destination.startsWith(destination);
}

export default function FlightFilter({ flights, destination, flightCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(flightCategory || "all");
  const [selectedDestination, setSelectedDestination] = useState(destination || "");
  const [flightsToShow, setFlightsToShow] = useState(flights.filter((flight) => combinedFilter(flight, selectedDestination, selectedCategory)));

  const handleFlightCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFlightsToShow(flights.filter((flight) => combinedFilter(flight, selectedDestination, category)));
  };

  return (
<div>
  <div className="flex items-center justify-center my-5">
      <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">Available Flights{selectedDestination && ` for ${selectedDestination}`}</h1>
      <div className="flex items-center p-1 gap-6">
        <div className="group form-control flex items-center p-1 w-48 bg-blue-900 border border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-700 btn">
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
        <div className="group form-control flex items-center p-1 w-48 bg-blue-900 border border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-700 btn">
          <label className="label cursor-pointer">
            <span className="label-text text-white font-bold">Empty Leg</span>
            <input
              type="radio"
              name="flight_category"
              value="empty_leg"
              checked={selectedCategory === "empty_leg"}
              className="radio ml-2"
              onChange={handleFlightCategoryChange}
            />
          </label>
        </div>
        <div className="group form-control flex items-center p-1 w-48 bg-blue-900 border border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-700 btn">
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
      <div className="form-control">
        <label className="label">
          <span className="label-text">Destination</span>
          <input
            type="text"
            placeholder="Enter destination"
            value={selectedDestination}
            onChange={(e) => {
              setSelectedDestination(e.target.value);
              setFlightsToShow(flights.filter((flight) => combinedFilter(flight, e.target.value, selectedCategory)));
            }}
            className="input input-bordered text-slate-900 bg-transparent outline-none leading-6 placeholder-slate-400 dark:text-white"
          />
        </label>
      </div>
      {flightsToShow.map((e) => (
        <EmptyLegCard key={e.id+e.flight_category} flight={e} />
      ))}
    </div>
  );
}
