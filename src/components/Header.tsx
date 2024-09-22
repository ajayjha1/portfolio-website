import React from 'react';
import { NameText } from './NameText';

export const Header = () => {
    const HeaderElements = ["Home", "Experience", "Projects", "Contact"];
    return (
        <div className="flex w-full text-white justify-between items-center">
            <div>
                <NameText />
            </div>
            <div>
                <ul className="flex list-none space-x-4">
                    {HeaderElements.map((element, index) => (
                        <li key={index}>
                            {element}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};