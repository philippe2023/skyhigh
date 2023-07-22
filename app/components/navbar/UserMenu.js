'use client'

import { AiOutlineMenu } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb'
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import Link from 'next/link';


function UserMenu() {
    return (
        <div 
            className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block btn bg-white normal-case border-none text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer dark:bg-gray-900 dark:text-gray-300">
                    Propose a trip
                </div>
                <div onClick={()=>window.my_modal_2.showModal()} className="btn bg-white border-none dropdown dropdown-end hidden md:block text-lg font-bold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer dark:bg-gray-900 dark:text-gray-300">
                    <TbWorld />
                </div>
                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box">
                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">Customize</a> 
                            <a className="tab tab-bordered">Currency</a> 
                            <a className="tab tab-bordered">Language and region</a> 
                        </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex="0">
                        <div className="p-4 md:py-1 md-px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                            <AiOutlineMenu />
                            <div className="hidden md:block">
                                <Avatar />
                            </div>
                        </div>
                    </label>

                    <div tabindex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 cursor-pointer">
                        <Link href="../user/signin">
                            <MenuItem item="Sign in" />
                        </Link>
                        <Link href="../user/signup">
                            <MenuItem item="Sign up" />
                        </Link>
                        <hr className="border-gray-200 dark:border-gray-700 " />

                        <MenuItem item="Propose a trip" />

                        <Link href="/sharing">
                            <MenuItem item="Find a trip" />
                        </Link>
                        <Link href="/about"><MenuItem item="About" /></Link>
                        <hr className="border-gray-200 dark:border-gray-700 " />
                        <MenuItem item="Help" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMenu;