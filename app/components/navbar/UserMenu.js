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
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer">
                    Propose a trip
                </div>
                <div className="hidden md:block text-lg font-bold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer">
                    <TbWorld />
                </div>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex="0">
                        <div className="p-4 md:py-1 md-px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                            <AiOutlineMenu />
                            <div className="hidden md:block">
                                <Avatar />
                            </div>
                        </div>
                    </label>
                    <div tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 cursor-pointer">
                        <MenuItem item="Sign in" />
                        <MenuItem item="Sign up" />
                        <MenuItem item="Propose a trip" />
                        <MenuItem item="Find a trip" />
                        <Link href="/about"><MenuItem item="about" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMenu;