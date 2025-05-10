import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const SidebarLayout = ({ children }) => {
  const { url } = usePage();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/' },
    { label: 'Profile', icon: 'person', path: '/profile' },
    { label: 'Support', icon: 'settings', path: '/admin/support' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md w-full fixed top-0 z-20">
        <span className="text-xl font-bold text-blue-600">Support Panel</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <span className="material-icons text-3xl">menu</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-200 transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-200 ease-in-out 
          lg:translate-x-0 lg:static lg:inset-auto
        `}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200 hidden lg:flex justify-center">
          <span className="text-2xl font-bold text-blue-600">Support Panel</span>
        </div>

        {/* Nav */}
        <nav className="p-6 mt-14 lg:mt-0">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = url === item.path;
              return (
                <li key={item.path}>
                  <Link
                  href={item.path}
                  className={`group flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
                    ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <span
                    className={`material-icons text-lg transition-transform duration-200 ease-in-out group-hover:scale-110 ${
                      isActive ? 'text-blue-600' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="transition-all duration-200 group-hover:font-medium group-hover:tracking-wide">
                    {item.label}
                  </span>
                </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
