function ProposedCard() {
    return (
        <div className="w-full max-w-xs text-align cursor-pointer">
            <img className="object-cover object-center w-full h-72 mx-auto rounded-lg hover:outline hover:outline-2 outline-offset-2 outline-slate-300 solid" src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="avatar" />
            <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Dusseldorf - Paris</h3>
                <span className="mt-1 font-medium text-gray-500 dark:text-gray-300">2 seats available</span>
                <p className="mt-1 font-medium text-gray-500 dark:text-gray-300">Fri, 01 Sep</p>
                <p className="mt-1 font-medium text-gray-900 dark:text-gray-300">EUR 1050</p>
            </div>
        </div>
    );
}

export default ProposedCard;