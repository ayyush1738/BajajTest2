import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                    <span className="text-white font-bold text-lg">AP21110010239</span>
                    <span className="text-gray-300">S Gyanesh Rao</span>
                </div>
                <h1 className="text-white font-bold text-xl text-center sm:text-left mt-2 sm:mt-0">
                    Bajaj Finserv Health | Fullstack Qualifier | Assignment | 22nd September'24
                </h1>
            </div>
        </nav>
    );
};

export default NavBar;