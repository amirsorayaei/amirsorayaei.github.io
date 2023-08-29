"use client";

/**
 * To check for mobile view (now 768px)
 * @returns {boolean}
 */
export const isMobile = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth < 1200;
};
