export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome, Admin! You can manage users from here.</p>
            <div className="mt-4 space-x-4">
                <a href="/admin/register" className="inline-block bg-green-500 text-white p-2 rounded">
                    Register New User
                </a>
                <a href="/admin/users" className="inline-block bg-blue-500 text-white p-2 rounded">
                    Manage Users
                </a>
            </div>
        </div>
    );
}