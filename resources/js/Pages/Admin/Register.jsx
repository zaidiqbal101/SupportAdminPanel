import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import SidebarLayout from '@/components/SidebarLayout';
import Navbar from '@/Components/Navbar';

export default function Register() {
  const { errors, flash } = usePage().props;
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/admin/users', form, {
      onSuccess: () => {
        setForm({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role: 'user',
        });
      },
      onError: (errors) => {
        console.log('Form submission errors:', errors);
      },
    });
  };

  return (
    <>
      <Navbar />
      <SidebarLayout>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 transition-all duration-500">
          <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:shadow-blue-200 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Register New User
            </h2>

            {flash?.success && (
              <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm font-medium">
                {flash.success}
              </div>
            )}

            {Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">
                {Object.values(errors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {['name', 'email', 'password', 'password_confirmation'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type={field.includes('password') ? 'password' : 'text'}
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition-all duration-300 shadow hover:shadow-lg"
              >
                Create User
              </button>
            </form>

            <div className="text-center mt-6">
              <a
                href="/admin/dashboard"
                className="text-blue-500 hover:text-blue-700 text-sm font-medium transition"
              >
                ← Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}
