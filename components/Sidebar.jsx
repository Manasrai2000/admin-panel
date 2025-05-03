'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Kanban', href: '/dashboard/kanban' },
  { label: 'Datatable', href: '/dashboard/datatable' },
];

export default function Sidebar({ sidebarOpen }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-56 h-screen pt-16 bg-white border-r border-gray-200 transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      }`}
    >
      <ul className="p-2 space-y-2">
        {navItems.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block px-4 py-2 rounded text-black hover:bg-gray-100 ${
                pathname === href ? 'bg-gray-200 font-bold' : ''
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
