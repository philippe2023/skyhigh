function Bookings() {
  return (
    <div className="bg-white dark:bg-gray-900 container px-6 pt-16 mx-auto">
      <div className="mt-6 mb-16">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
          Congratulations! Your booking is set!
        </h1>
        <p className="mt-6 text-gray-500 dark:text-gray-300">
          A mere 23 days until an exciting journey.
        </p>
        <p className="mt-6 text-gray-500 dark:text-gray-300">
          A confirmation-email has been sent to firstname.lastname@yourmail.com.
        </p>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-3 max-md:grid-cols-1 container  mx-auto justify-between">
          <span className="container mx-auto text-left">
            You paid <span className="font-bold">€ 1400</span>.
          </span>
          <span className="container mx-auto text-center max-md:text-left">
            {" "}
            <span className="font-bold">2</span> seats
          </span>
          <span className="container mx-auto text-right max-md:text-left">
            Your booking number: <span className="font-bold">X8R3Q2W7Y</span>
          </span>
        </div>

        <div className="py-5 grid grid-cols-5 gap-2 max-md:grid-cols-2">
          <div className="col-span-2 bg-slate-200 rounded-xl">
            <div className="p-5 grid grid-cols-2 gap-2">
              <div className=" grid grid-cols-1">
                <div className="text-right py-2">Departure</div>
                <img
                  className="w-12 mr-auto ml-auto"
                  src="/images/plane-departure-solid.svg"
                />
              </div>
              <div className="grid grid-cols-1">
                <div className="text-left py-2">Düsseldorf</div>
                <div className="text-left py-2">Thursday July 18th 2023</div>
                <div className="text-left py-2">10:25 a.m.</div>
              </div>
            </div>
          </div>
          <div className="col-span-1 max-md:col-span-2 text-center align-middle  grid grid-cols-1">
            <div className="my-auto">40 minutes in the air</div>
            <img className="w-12 mx-auto" src="/images/plane-solid.svg" />
          </div>
          <div className="col-span-2 bg-slate-200 rounded-xl">
            <div className="p-5 grid grid-cols-2 gap-2">
              <div className=" grid grid-cols-1">
                <div className="text-right py-2">London</div>
                <div className="text-right py-2">Thursday July 18th 2023</div>
                <div className="text-right py-2">11:05 a.m.</div>
              </div>
              <div className="grid grid-cols-1">
                <div className="text-left py-2">Arrival</div>
                <img
                  className="w-12 ml-auto mr-auto"
                  src="/images/plane-arrival-solid.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        className="object-cover w-full rounded-xl"
        src="https://assets.gulfstream.aero/thedotcom/images/aircraft/g700/d_g700_a_print_00085_PROD.jpg"
      />
    </div>
  );
}

export default Bookings;
