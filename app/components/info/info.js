function Info() {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Discover <span className="underline decoration-blue-500">FlyJets</span></h1>

                <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
                    <div className=" bg-gray-100 rounded-lg dark:bg-gray-800">
                        <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 w-auto group" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1625513123245-fcb02d69ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80)'}}>
                            <div className="flex flex-col justify-between w-full h-full px-5 pb-4 transition-opacity duration-700 backdrop-blur-sm group-hover:bg-slate-500/30">
                                <button class="mt-8 absolute right-8 py-1 w-24 text-xs text-white capitalize font-thin transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">view more</button>
                                <div>
                                    <h1 className="text-7xl font-semibold text-white absolute bottom-3">Search <br />available seats</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-gray-100 rounded-lg dark:bg-gray-800">
                        <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 w-auto group" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1808&q=80)'}}>
                            <div className="flex flex-col justify-between w-full h-full px-5 pb-4 transition-opacity duration-700 backdrop-blur-sm group-hover:bg-slate-500/30">
                                <button class="mt-8 absolute right-8 py-1 w-24 text-xs text-white capitalize font-thin transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">view more</button>
                                <div>
                                    <h1 className="text-7xl font-semibold text-white absolute bottom-3">Propose <br />a new trip</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-gray-100 rounded-lg dark:bg-gray-800">
                        <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 w-auto group" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1034&q=80)'}}>
                            <div className="flex flex-col justify-between w-full h-full px-5 pb-4 transition-opacity duration-700 backdrop-blur-sm group-hover:bg-slate-500/30">
                                <button className="mt-8 absolute right-8 py-1 w-24 text-xs text-white capitalize font-thin transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">view more</button>
                                <div>
                                    <h1 className="text-7xl font-semibold text-white absolute bottom-3">Find <br />suggestions</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-gray-100 rounded-lg dark:bg-gray-800">
                        <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 w-auto group" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1574202141112-c3a90e1a3ce2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80)'}}>
                            <div className="flex flex-col justify-between w-full h-full px-5 pb-4 transition-opacity duration-700 backdrop-blur-sm group-hover:bg-slate-500/30">
                                <button class="mt-8 absolute right-8 py-1 w-24 text-xs text-white capitalize font-thin transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">view more</button>
                                <div>
                                    <h1 className="text-7xl font-semibold text-white absolute bottom-3">Propose and <br />share flights</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Info;