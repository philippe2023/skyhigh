export default function SearchModal() {
    return (
        <dialog id="searchModal" className="modal modal-bottom sm:modal-middle">
            <form method="dialog" className="modal-box  dark:bg-gray-800 dark:text-gray-50">
                <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 w-auto group" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1625513123245-fcb02d69ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80)'}}></div>
                <div className="max-w-2xl px-6 py-10 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">
                    <div className="w-full mx-auto space-y-4 text-center">
                        <h1 className="text-xl font-bold md:text-5xl">Search available flights</h1>
                    </div>
                    <div className="border-t border-b py-10 dark:text-gray-100">
                        <p>Search our extensive list of available private jet or available seats on private trips! Either use our Search bar to find your ideal destination or browse our list of available flights.</p>
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
    );
}