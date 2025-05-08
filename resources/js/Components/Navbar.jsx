import React from 'react';
import { Link } from '@inertiajs/react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Admin Panel
        </div>
        <div className="space-x-4">
          <Link href="/admin/register">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Register New User
            </button>
          </Link>
          <Link href="/admin/users">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Manage Users
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;