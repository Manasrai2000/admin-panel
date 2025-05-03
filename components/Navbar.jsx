'use client';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="sm:hidden p-2 rounded bg-gray-100"
        >
          ☰
        </button>
        <h1 className="text-lg font-bold text-black">Dashboard</h1>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </nav>
  );
}
