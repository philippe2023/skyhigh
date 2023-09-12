// from https://github.com/vercel/next.js/discussions/42016#discussioncomment-5596315
// used to listen to naviagtion events
// to close the search bar when navigating to a new page

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const useNavigationEvent = (onPathnameChange) => {
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname, onPathnameChange]);
};