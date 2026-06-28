"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NameText } from './NameText';

export const Header = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const HeaderElements = [
        { name: "Home", path: "/" },
        { name: "Experience", path: "/Experience" },
        { name: "Projects", path: "/Projects" },
        { name: "Blog", path: "/Blog" },
        { name: "Playground", path: "/Playground" },
        { name: "Contact", path: "/Contact" }
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <div className="flex w-full text-white justify-between items-center p-4">
                <div>
                    <NameText />
                </div>
                <div className="hidden md:flex">
                    <div>
                        <ul className="flex list-none space-x-7 text-xl font-roboto-black text-slate-300">
                            {HeaderElements.map((element, index) => (
                                <li 
                                    key={index} 
                                    className={`hover:text-white cursor-pointer ${
                                        pathname === element.path ? "text-white" : ""
                                    }`}
                                >
                                    <Link href={element.path}>
                                        {element.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='md:hidden cursor-pointer text-2xl' onClick={toggleMobileMenu}>
                    ☰
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col p-5">
                    <div className="flex justify-end">
                        <button 
                            onClick={toggleMobileMenu} 
                            className="text-white text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-6 mt-10 text-xl font-roboto-black text-slate-300">
                        {HeaderElements.map((element, index) => (
                            <li 
                                key={index} 
                                className={`hover:text-white cursor-pointer ${
                                    pathname === element.path ? "text-white" : ""
                                }`}
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <Link href={element.path}>
                                    {element.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Backdrop for mobile menu */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMobileMenu}
                ></div>
            )}
        </>
    );
};