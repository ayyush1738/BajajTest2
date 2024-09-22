import React from 'react';
import bj from './bajaj.png'

const NavBar = () => {
    return (
        <nav className="bg-gray-900">
            <div className="sm:flex-row  items-center sm:space-y-0 ">
                <img src={bj} alt="Logo" className="w-44 h-44 ml-4" />
            </div>
        </nav>
    );
};

export default NavBar;