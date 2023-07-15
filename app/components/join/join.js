import Link from "next/link";
import Image from 'next/image';
import JoinCard from "./joinCard";

function Join() {
    return (
        <header className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-16 mx-auto">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/3">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Join SkyHigh <span className="text-blue-500 ">Today</span></h1>
                            
                            <p className="mt-3 text-gray-600 dark:text-gray-400">Be in charge of your schedule. Travel in class without all the pain of commercial flights and enjoy the perks of flying private.</p>
                            
                            <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-slate-800 rounded-lg lg:w-auto hover:bg-slate-700 focus:outline-none focus:bg-slate-500">Join Now</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-full mt-6 lg:mt-0 lg:w-2/3">
                        <JoinCard />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Join;