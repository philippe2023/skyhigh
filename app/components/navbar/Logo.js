'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Logo() {
    const router = useRouter();

    return (
        <Link href="/">
            <Image 
                alt="Logo"
                className="hidden md:block cursor-pointer"
                height="100"
                width="100"
                src="/images/logo.svg"
            />
        </Link>
    );
}

export default Logo