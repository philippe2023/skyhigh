'use client'

import { AiOutlineMenu } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem';
import Link from 'next/link';

function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div 
            onClick={() => {}}
            className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={() => {}} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer">
                    Propose a trip
                </div>
                <div onClick={() => {}} className="hidden md:block text-lg font-bold py-3 px-4 rounded-full hover:bg-slate-800 hover:text-gray-50 transition curser-pointer">
                    <TbWorld />
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md-px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <div>
                            <MenuItem item="Sign in" />
                            <MenuItem item="Sign up" />
                            <MenuItem item="Propose a trip" />
                            <MenuItem item="Find a trip" />
                            <Link href="/about"><MenuItem item="about" /></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;