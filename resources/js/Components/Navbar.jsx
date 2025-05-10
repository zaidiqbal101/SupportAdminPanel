import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = usePage(); // for active path detection

  const menuItems = [
    { label: 'Register New User', icon: 'dashboard', path: '/admin/register' },
    { label: 'Existing Users', icon: 'person', path: '/admin/users' },
    // { label: 'Support', icon: 'settings', path: '/admin/support' },
  ];

   {/* <Link href="/admin/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
                Register New User
              </button>
            </Link>
            <Link href="/admin/users">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition">
                Existing Users
              </button>
            </Link> */}

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="text-white text-xl font-semibold tracking-wide">
            Admin Panel
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => {
              const isActive = url === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-blue-100 hover:text-blue-800'
                    }
                  `}
                >
                  <span
                    className={`material-icons text-xl transition-transform duration-300 ease-in-out group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-blue-400 group-hover:text-blue-800'
                    }`}
                  >
                    {/* {item.icon} */}
                  </span>
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? 'font-semibold text-white' : 'group-hover:font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <span className="material-icons text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className="flex items-center gap-2 w-full bg-gray-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-icons text-white">{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
