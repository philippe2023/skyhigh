function Header() {
    return (
        
        <div className="container mx-auto mb-5 sm:mb-10 md:mb-15 bg-fixed w-11/12 h-fit bg-no-repeat overflow-none" style={{backgroundImage: 'url(/images/Hero.png)'}}>
            <div className="relative">
                <div className="px-4 sm:px-6 md:px-8">
                    <div className="relative max-w-5xl mx-auto py-20 sm:pt-24 lg:py-28">
                        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                            Re-imagined private flights, fast and easy for modern travelers.
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-gray-200">
                            Fly private to your chosen destination and on your own term
                            <code className="font-mono font-medium text-sky-500 dark:text-sky-400"> alone</code>,
                            <code className="font-mono font-medium text-sky-500 dark:text-sky-400"> in group</code>,
                            <code className="font-mono font-medium text-sky-500 dark:text-sky-400"> or share </code> 
                            and enjoy the advantages of premium travel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;