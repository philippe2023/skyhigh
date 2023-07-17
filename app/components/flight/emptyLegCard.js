import Link from "next/link";

function EmptyLegCard() {
    return (
        <div className="w-full max-w-xs text-align cursor-pointer ">
            <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group hover:outline hover:outline-2 outline-offset-2 outline-slate-300 solid" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80)'}}>
                <div className="flex flex-col justify-between w-full h-full px-5 pb-4 transition-opacity duration-700 group-hover:backdrop-blur-sm group-hover:bg-slate-500/30">
                    <button className="mt-4 px-2 py-1 w-24 text-xs text-white capitalize font-thin transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">24 Jun, Sat</button>
                    <div>
                        <h2 className="text-xl font-semibold text-white capitalize">Köln - London</h2>
                        <p className="mt-2 text-md font-light tracking-wider text-white">up to 8</p>
                        <h2 className="mt-4 mb-6 text-xl font-semibold text-white capitalize">from € 8,117</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyLegCard;