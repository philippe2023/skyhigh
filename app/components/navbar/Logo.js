'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from 'next-themes'

function Logo() {
    const { resolvedTheme } = useTheme();
    let src;

    switch (resolvedTheme) {
    case 'light':
        src = '/images/skyhigh.png';
        break;
    case 'dark':
        src = '/images/skyhigh-dark.png';
        break;
    default:
        src = '/images/skyhigh.png';
        break;
    }

    return (
        <Link href="/">
            <Image src={src} alt="Logo" className="hidden md:block cursor-pointer" height="120" width="120" />
        </Link>
    );
}

export default Logo
