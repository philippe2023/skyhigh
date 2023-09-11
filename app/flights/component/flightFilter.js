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
    <>
      <div className="flex justify-between">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">All</span>
            <input
              type="radio"
              name="flight_category"
              value="all"
              checked={selectedCategory === "all"}
              className="radio ml-2"
              onChange={handleFlightCategoryChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Empty Leg</span>
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
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Sharing</span>
            <input
              type="radio"
              name="flight_category"
              value="sharing"
              checked={selectedCategory === "sharing"}
              className="radio ml-2"
              onChange={handleFlightCategoryChange}
            />
          </label>
        </div>
      </div>

      {flightsToShow.map((e) => (
        <EmptyLegCard key={e.id+e.flight_category} flight={e} />
      ))}
    </>
  );
}
