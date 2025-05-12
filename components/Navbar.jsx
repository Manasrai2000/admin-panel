'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    // Remove all localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    router.push('/auth/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow">
      <div className="p-4 flex justify-between items-center">
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="sm:hidden p-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          ☰
        </button>

        {/* Dashboard title */}
        <h1 className="text-lg font-bold text-black">Dashboard</h1>

        {/* User avatar and dropdown */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400"
          >
            <span className="text-white font-bold">{/* Optional initials */}</span>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    onClick={() => router.push('/profile')} // Redirect to profile page
                    className="w-full text-left"
                  >
                    My Profile
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}