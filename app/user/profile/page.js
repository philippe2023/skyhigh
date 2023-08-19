function Profile() {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
            <div className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl">
                <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">John Doe</h1>

                <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">john.doe@mail.com</p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="flex items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
                        <button className="px-4 py-2 text-sm font-medium text-white capitalize bg-blue-600 md:py-3 rounded-xl md:px-12">My Flights</button>
                        <button className="px-4 py-2 mx-4 text-sm font-medium text-blue-600 capitalize transition-colors duration-300 md:py-3 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:mx-8 md:px-12">Proposed flights</button>
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 capitalize transition-colors duration-300 md:py-3 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:px-12">Interested</button>
                    </div>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 my-3 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Destination</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Departure Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Airport
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Plane
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">More</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg>
                                                        </div>
                                                        
                                                        <div>
                                                            <h2 className="font-normal text-gray-800 dark:text-white ">To London</h2>
                                                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400">from Paris</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                Confirmed
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 4, 2023</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Paris Charles de Gaules</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">GolfStream 500</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg>
                                                        </div>
                                                        
                                                        <div>
                                                            <h2 className="font-normal text-gray-800 dark:text-white ">To London</h2>
                                                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400">from Paris</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                Confirmed
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 4, 2023</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Paris Charles de Gaules</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">GolfStream 500</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <div className="flex items-center gap-x-2">
                                                    <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    
                                                    <div>
                                                        <h2 className="font-normal text-gray-800 dark:text-white ">To London</h2>
                                                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">from Paris</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                            Confirmed
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 4, 2023</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Paris Charles de Gaules</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">GolfStream 500</td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;