import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import Link from 'next/link';
import WorldIcon from './WorldIcon';
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

async function UserMenu() {
    const session = await getServerSession(authOptions);
    return (
        <>
        {session ? (
            <div 
            className="relative">
            <div className="flex flex-row items-center gap-3">
                <Link className="hidden md:block btn bg-white normal-case border-none text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer dark:bg-gray-900 dark:text-gray-300" href="/propose-trip">Propose a trip</Link>
                <WorldIcon />
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex="0">
                        <div className="p-4 md:py-1 md-px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                            <AiOutlineMenu />
                            <div className="hidden md:block">
                                <Avatar />
                            </div>
                        </div>
                    </label>

                    <div tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 cursor-pointer dark:bg-slate-900">
                        <Link href="/user/profile">
                            <MenuItem item="Profile" />
                        </Link>
                        <Link href="/api/auth/signout">
                            <MenuItem item="Sign out" />
                        </Link>
                        <hr className="border-gray-200 dark:border-gray-700 " />
                        <Link href="/sharing">
                            <MenuItem item="Find a trip" />
                        </Link>
                        <Link href="/about"><MenuItem item="About" /></Link>
                        <hr className="border-gray-200 dark:border-gray-700 " />
                        <Link href="/help"><MenuItem item="Help" /></Link>
                    </div>
                </div>
            </div>
        </div>
        ) : (
            <div className="flex flex-row items-center gap-3">
                <WorldIcon />
                <Link
                 href="/api/auth/signin"
                 className="hidden md:block btn bg-white normal-case border-none text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-800 dark:hover:bg-white hover:text-gray-50 dark:hover:text-black transition curser-pointer dark:bg-gray-900 dark:text-gray-300"
                >Log in</Link>
            </div>
        )}
        </>
    );
}

export default UserMenu;
