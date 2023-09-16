import Container from "../container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import WorldIcon from "./WorldIcon";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { db } from "../../_utils/database";

function getAllDestinations() {
    const stmt = `
    SELECT DISTINCT destination FROM (
        SELECT destination FROM empty_leg
        UNION
        SELECT destination FROM proposed_trip
    ) AS combined_destinations;`;
    const all = db.prepare(stmt).all();
    return all;
}

async function Navbar() {
    const allDestinations = getAllDestinations();
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-0 left-0 right-0 w-full bg-white z-10 shadow-sm dark:bg-gray-900 dark:text-gray-300">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search allDestinations={allDestinations} />
                        {session ? (
                            <UserMenu />
                        ) : (
                            <div className="flex flex-row items-center gap-3">
                                <WorldIcon />
                                <Link
                                    href="/api/auth/signin"
                                    className="hidden md:block btn bg-white normal-case border-none text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-800 dark:hover:bg-white hover:text-gray-50 dark:hover:text-black transition curser-pointer dark:bg-gray-900 dark:text-gray-300"
                                >Log in</Link>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;