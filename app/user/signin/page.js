import Link from "next/link";
import Image from "next/image";

function SignIn() {
    return (
        <div className="flex my-40 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1635668422724-fffb2201f951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80)'}}></div>
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <Link href="/">
                    <Image 
                        alt="Logo"
                        className="hidden md:block cursor-pointer mx-auto"
                        height="100"
                        width="100"
                        src="/images/logo.svg"
                    />
                </Link>
                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Welcome back!
                </p>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Email Address</label>
                    <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="loggingPassword">Password</label>
                        <Link href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</Link>
                    </div>
                    <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                </div>
                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Sign In
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    <Link href="/user/signup" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
}

export default SignIn;