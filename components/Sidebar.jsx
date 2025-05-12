'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ sidebarOpen }) {
  const pathname = usePathname();
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('https://test-apis.codebright.in/auth-api/menu-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            PR_TOKEN: localStorage.getItem('authToken'),
          }),
        });

        const json = await res.json();
        if (json.STATUS === 'SUCCESS') {
          setMenuData(json.DATA || []);
        }
      } catch (err) {
        console.error('Failed to fetch menu data:', err);
      }
    };

    fetchMenu();
  }, []);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-60 h-screen pt-16 bg-white border-r border-gray-200 transition-transform overflow-hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
    >
      <div className="h-full overflow-y-auto px-2 py-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <ul className="space-y-4">
          {menuData.map((menu, index) => (
            <li key={index}>
              {/* Main Menu Title */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {menu.PR_MENU_NAME}
              </div>

              {/* Submenu List */}
              <ul className="space-y-1 mt-1">
                {menu.PR_SUBMENUES.map((sub, subIndex) => {
                  return (
                    <li key={subIndex}>
                      <Link
                        href={{
                          pathname: "/dashboard/datatable",
                          query: { submenu: JSON.stringify(sub) },
                        }}
                        className={`block px-4 py-2 text-sm rounded-md transition-all text-gray-700 hover:bg-gray-100`}>
                        {sub.PR_MENU_NAME}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
