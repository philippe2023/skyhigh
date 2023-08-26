'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

function Logo() {
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // 4x1 transparent gif to have the same aspect ratio as the logo
        return (
        <Link href="/">
            <Image src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAQAAABTNcdGAAAAC0lEQVR42mNkgAIAABIAAmXG3J8AAAAASUVORK5CYII=" alt="Logo" className="hidden md:block cursor-pointer" width={120} height={30} />
        </Link>);
    }

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
            src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAQAAABTNcdGAAAAC0lEQVR42mNkgAIAABIAAmXG3J8AAAAASUVORK5CYII=';
            break;
    }

    return (
        <Link href="/">
            <Image src={src} alt="Logo" className="hidden md:block cursor-pointer" width={120} height={30} />
        </Link>
    );
}

export default Logo;
