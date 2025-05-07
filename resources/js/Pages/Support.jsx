import React, { useState, useEffect } from 'react';

const Support = ({ tickets }) => {
  const [formData, setFormData] = useState({
    department: '',
    priority: '',
    services: '',
  });
  const [options, setOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch dynamic options on component mount
  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dynamicoptions');
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      setMessage('Failed to load options.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const url = editingId ? `/api/dynamicoptions/${editingId}` : '/api/dynamicoptions';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingId ? 'Option updated successfully!' : 'Option added successfully!');
        setFormData({ department: '', priority: '', services: '' });
        setEditingId(null);
        fetchOptions();
      } else {
        setMessage('Failed to save option. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleEdit = (option) => {
    setFormData({
      department: option.department,
      priority: option.priority,
      services: option.services,
    });
    setEditingId(option.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this option?')) return;
    try {
      const response = await fetch(`/api/dynamicoptions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Option deleted successfully!');
        fetchOptions();
      } else {
        setMessage('Failed to delete option.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>

      {/* Form for adding/editing dynamic options */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Option' : 'Add New Option'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <input
              type="text"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Services</label>
            <textarea
              name="services"
              value={formData.services}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              {editingId ? 'Update Option' : 'Add Option'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ department: '', priority: '', services: '' });
                  setEditingId(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Table for displaying dynamic options */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Dynamic Options</h2>
        {loading ? (
          <p>Loading options...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Department</th>
                  <th className="py-2 px-4 border-b text-left">Priority</th>
                  <th className="py-2 px-4 border-b text-left">Services</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {options && options.length > 0 ? (
                  options.map((option) => (
                    <tr key={option.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{option.id}</td>
                      <td className="py-2 px-4 border-b">{option.department}</td>
                      <td className="py-2 px-4 border-b">{option.priority}</td>
                      <td className="py-2 px-4 border-b">{option.services}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEdit(option)}
                          className="text-blue-500 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(option.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 text-center">
                      No options found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Existing ticket table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Subject</th>
              <th className="py-2 px-4 border-b text-left">Department</th>
              <th className="py-2 px-4 border-b text-left">Priority</th>
              <th className="py-2 px-4 border-b text-left">Service</th>
              <th className="py-2 px-4 border-b text-left">Body</th>
              <th className="py-2 px-4 border-b text-left">Attachment</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{ticket.id}</td>
                  <td className="py-2 px-4 border-b">{ticket.subject}</td>
                  <td className="py-2 px-4 border-b">{ticket.department}</td>
                  <td className="py-2 px-4 border-b">{ticket.priority}</td>
                  <td className="py-2 px-4 border-b">{ticket.service}</td>
                  <td className="py-2 px-4 border-b">{ticket.body}</td>
                  <td className="py-2 px-4 border-b">
                    {ticket.attachment ? (
                      <a
                        href={ticket.attachment}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      'None'
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(ticket.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(ticket.updated_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-2 px-4 text-center">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;