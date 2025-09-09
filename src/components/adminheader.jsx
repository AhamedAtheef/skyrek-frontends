import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-end p-4 bg-white shadow-sm rounded-lg">
      <div className="flex items-center space-x-4">
        <span className="relative">
          <i className="fa-solid fa-bell text-gray-500"></i>
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </span>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;