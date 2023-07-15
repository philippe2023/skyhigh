'use client'

import Container from "../container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

function Navbar() {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm dark:bg-gray-900 dark:text-gray-300">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;