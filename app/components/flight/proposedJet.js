import ProposedCard from "./proposedCard";
import Link from "next/link";

function ProposedJet() {
    return (
        <div className=" bg-white dark:bg-gray-900 dark:text-gray-300">
        <div className="container px-6 py-1 mx-auto">
            <div className="flex items-center justify-between my-10">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Find sharing flights </h1>
                <Link href="/sharing">                
                    <button className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="my-8 border-gray-200 dark:border-gray-700"></div>
                <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    <ProposedCard />
                    <ProposedCard />
                    <ProposedCard />
                    <ProposedCard />
                    <ProposedCard />
                </div>
            </div>
        </div>
    );
}

export default ProposedJet;