"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export const Header = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to determine if a link is active
    const isActive = (path: string) => {
        return pathname === path ? "active-link active" : "active-link";
    };

    // Function to toggle menu on mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-black p-6 w-full top-0 left-0 relative custom-corner-header">
            <div className="flex justify-between items-center w-full">
                <Link href={"/"} className="flex items-center gap-[6px]">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={42}
                        priority
                        quality={100}
                    />
                    <Image
                        src="/white-word.png"
                        alt="brand text"
                        width={92}
                        height={20}
                        priority
                        quality={100}
                    />
                </Link>

                {/* Hamburger icon for mobile */}
                <button
                    className="text-white block lg:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    {/* Hamburger Icon */}
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    )}
                </button>

                {/* Navigation Links - Only show on large screens */}
                <nav className={`hidden lg:flex space-x-6 text-sm font-medium`}>
                    <Link href="/dashboard" className={isActive("/dashboard")}>
                        Dashboard
                    </Link>
                    <Link href="/order" className={isActive("/order")}>
                        Orders
                    </Link>
                    <Link href="/marketplace" className={isActive("/marketplace")}>
                        Marketplace
                    </Link>
                </nav>

                {/* Icons - Visible on all screen sizes */}
                <div className="text-white">
                    icons
                </div>
            </div>

            {/* Mobile Menu - Show when isMenuOpen is true */}
            {isMenuOpen && (
                <nav className="lg:hidden mt-4">
                    <Link href="/dashboard" className={`block py-2 ${isActive("/dashboard")}`}>
                        Dashboard
                    </Link>
                    <Link href="/order" className={`block py-2 ${isActive("/order")}`}>
                        Orders
                    </Link>
                    <Link href="/marketplace" className={`block py-2 ${isActive("/marketplace")}`}>
                        Marketplace
                    </Link>
                </nav>
            )}
        </header>
    );
};
