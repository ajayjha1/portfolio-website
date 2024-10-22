import React from 'react';
import { NameText } from './NameText';

export const Header = () => {
    const HeaderElements = ["Home", "Experience", "Projects", "Contact"];
    return (
        <div className="flex w-full text-white justify-between items-center">
            <div>
                <NameText />
            </div>
            <div className="hidden md:flex">
                <div>
                    <ul className="flex list-none space-x-7 text-xl font-roboto-black text-slate-300">
                        {HeaderElements.map((element, index) => (
                            <li key={index}  className = "hover:text-white">
                                {element}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='md:hidden'>
                =
            </div>
        </div>
    );
};