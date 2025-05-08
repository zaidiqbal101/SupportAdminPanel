import { useState } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Register() {
    const { errors, flash } = usePage().props;
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', // Default role
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register New User</h2>
                {flash?.success && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            value={form.password_confirmation}
                            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create User
                    </button>
                </form>
                <a href="/admin/dashboard" className="mt-4 inline-block text-blue-500 hover:underline">
                    Back to Dashboard
                </a>
            </div>
        </div>
    );
}