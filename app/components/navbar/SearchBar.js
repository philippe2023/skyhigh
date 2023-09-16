import { useState } from "react";
import Counter from "./counter";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

function SearchBar({ allDestinations }) {
  const router = useRouter();
  const [searchActivated, setIsSearchActivated] = useState(false);
  //const [tripDate, setTripDate] = useState(new Date());
  const [destination, setDestination] = useState("");
  const [noOfPassengers, setNoOfPassengers] = useState(1);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = async (_event) => {
    const searchURL =
      "/flights?" + new URLSearchParams({ destination: destination });
    // This redirect somehow has an Unhandled Runtime Error 'Error: NEXT_REDIRECT'
    // redirect(searchURL);
    router.push(searchURL);
  };
  return (
    <>
      <div className="flex flex-row self-center rounded-full border p-2">
        <button onClick={() => setIsSearchActivated(true)}>
          <p className="font-bold">Where?</p>
          {setIsSearchActivated ? (
            <>
              <input
                list="destinations"
                type="text"
                name="destination"
                placeholder="Search destinations"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-slate-900 bg-transparent border-none outline-none leading-6 placeholder-slate-400 dark:text-white"
                autoFocus
              />
              <datalist id="destinations">
                {allDestinations.map((destination) => (
                  <option value={destination.destination}></option>
                ))}
              </datalist>
            </>
          ) : (
            <div>
              <p className="text-slate-600">Search destination</p>
            </div>
          )}
        </button>
        <div className="px-4 border-l border-r">
          <label>
            <button onClick={() => setIsSearchActivated(true)}>
              <p className="font-bold">Date</p>
              {setIsSearchActivated ? (
                <input
                  type="date"
                  placeholder="Search date"
                  onKeyDown={handleKeyDown}
                  className="text-slate-900 bg-transparent border-none outline-none leading-6 placeholder-slate-400 dark:text-white"
                />
              ) : (
                <div>
                  <p className="text-slate-600">hello</p>
                </div>
              )}
            </button>
          </label>
        </div>
        <div className="dropdown dropdown-end px-4">
          <label tabIndex={2}>
            <p className="font-bold">Who</p>
            <p className="text-slate-600">Add guests</p>
          </label>
          <div
            tabIndex={2}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Counter
              /* label="Adults" */ props={{ noOfPassengers, setNoOfPassengers }}
            />
          </div>
        </div>
        <button
          onClick={submit}
          className="px-6 text-white rounded-full bg-black flex my-auto py-4 dark:bg-slate-200 dark:text-black"
        >
          <BiSearch className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </>
  );
}

export default SearchBar;
