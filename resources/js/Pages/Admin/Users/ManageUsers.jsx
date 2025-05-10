import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayout from '@/components/SidebarLayout';
import Navbar from '@/Components/Navbar';


export default function ManageUsers({ users }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/admin/users', form);
        setForm({ name: '', email: '', password: '' });
    };

    return (
        
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Create User</h2>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Create User
                    </button>
                </form>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Existing Users1</h2>
                <ul className="bg-white p-4 rounded shadow-md">
                    {users.map((user) => (
                        <li key={user.id} className="py-2 border-b">
                            {user.name} ({user.email})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </SidebarLayout>
        </>
    );
}