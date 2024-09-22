import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                    <span className="text-white font-bold text-lg">Bajaj Finserv Health</span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;