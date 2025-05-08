import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/Components/Navbar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const Support = ({ tickets: initialTickets = [] }) => {
  const [formData, setFormData] = useState({
    department: '',
    priority: '',
    services: '',
  });
  const [options, setOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    ticketId: null,
    status: '',
    message: '',
  });
  const [statusLoading, setStatusLoading] = useState(false);
  const [tickets, setTickets] = useState(initialTickets);
  const [isFormOpen, setIsFormOpen] = useState(false); // State for collapsible form
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // State for collapsible options

  useEffect(() => {
    let isMounted = true;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/dynamicoptions');
        if (isMounted) {
          setOptions(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(`Failed to load options: ${error.response?.data?.message || error.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const url = editingId ? `/api/dynamicoptions/${editingId}` : '/api/dynamicoptions';
      const method = editingId ? 'put' : 'post';
      await axios({
        method,
        url,
        data: formData,
      });
      toast.success(editingId ? 'Option updated successfully!' : 'Option added successfully!');
      setFormData({ department: '', priority: '', services: '' });
      setEditingId(null);
      setIsFormOpen(false); // Close form after submit
      await fetchOptions();
    } catch (error) {
      toast.error(`Error saving option: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (option) => {
    setFormData({
      department: option.department || '',
      priority: option.priority || '',
      services: option.services || '',
    });
    setEditingId(option.id);
    setIsFormOpen(true); // Open form when editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this option?')) return;
    try {
      await axios.delete(`/api/dynamicoptions/${id}`);
      toast.success('Option deleted successfully!');
      await fetchOptions();
    } catch (error) {
      toast.error(`Error deleting option: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleStatusChange = (ticketId, value) => {
    setStatusDialog({
      open: true,
      ticketId,
      status: value,
      message: '',
    });
  };

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/dynamicoptions');
      setOptions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error(`Failed to load options: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, status, statusMessage) => {
    setStatusLoading(true);
    try {
      const response = await axios.put(`/tickets/${ticketId}/status`, {
        status,
        statusMessage,
      });
      const updatedTicket = response.data.ticket;
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status, message: statusMessage } : ticket
        )
      );
      toast.success(`Ticket marked as ${status} successfully!`);
    } catch (error) {
      toast.error(`Failed to update ticket status: ${error.response?.data?.message || error.message}`);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleStatusDialogSubmit = () => {
    if (!statusDialog.message.trim()) {
      toast.error('Please provide a reason for the status change.');
      return;
    }
    updateTicketStatus(statusDialog.ticketId, statusDialog.status, statusDialog.message);
    setStatusDialog({ open: false, ticketId: null, status: '', message: '' });
  };

  const handleCancelEdit = () => {
    setFormData({ department: '', priority: '', services: '' });
    setEditingId(null);
    setIsFormOpen(false); // Close form on cancel
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Support Tickets</h1>

      <div className="mb-12">
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
        >
          {isFormOpen ? 'Hide Form' : 'Add New Option'}
        </Button>
        {isFormOpen && (
          <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              {editingId ? 'Edit Option' : 'Add New Option'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-600">
                  Department
                </label>
                <Input
                  id="department"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-600">
                  Priority
                </label>
                <Input
                  id="priority"
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="services" className="block text-sm font-medium text-gray-600">
                  Services
                </label>
                <Textarea
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  disabled={submitLoading}
                >
                  {submitLoading ? 'Saving...' : editingId ? 'Update Option' : 'Add Option'}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                    onClick={handleCancelEdit}
                    disabled={submitLoading}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="mb-12">
        <Button
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
        >
          {isOptionsOpen ? 'Hide Dynamic Options' : 'Show Dynamic Options'}
        </Button>
        {isOptionsOpen && (
          <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Dynamic Options</h2>
            {loading ? (
              <p className="text-gray-500">Loading options...</p>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">ID</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Department</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Priority</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Services</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.length > 0 ? (
                      options.map((option) => (
                        <tr key={option.id} className="hover:bg-gray-50 transition">
                          <td className="py-3 px-6 border-b text-gray-700">{option.id}</td>
                          <td className="py-3 px-6 border-b text-gray-700">{option.department || 'N/A'}</td>
                          <td className="py-3 px-6 border-b text-gray-700">{option.priority || 'N/A'}</td>
                          <td className="py-3 px-6 border-b text-gray-700">{option.services || 'N/A'}</td>
                          <td className="py-3 px-6 border-b">
                            <Button
                              variant="link"
                              onClick={() => handleEdit(option)}
                              className="text-blue-600 hover:text-blue-800 mr-4"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="link"
                              onClick={() => handleDelete(option.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                          No options found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tickets</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Subject</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Department</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Priority</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Service</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Body</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Attachment</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Created At</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Updated At</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Chat</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-6 border-b text-gray-700">{ticket.id}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{ticket.subject || 'N/A'}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{ticket.department || 'N/A'}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{ticket.priority || 'N/A'}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{ticket.service || 'N/A'}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{ticket.body || 'N/A'}</td>
                  <td className="py-3 px-6 border-b">
                    {ticket.attachment ? (
                      <a
                        href={ticket.attachment}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      'None'
                    )}
                  </td>
                  <td className="py-3 px-6 border-b">
                    <Select
                      value={ticket.status || 'pending'}
                      onValueChange={(value) => handleStatusChange(ticket.id, value)}
                    >
                      <SelectTrigger className="w-[140px] rounded-lg border-gray-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Processing</SelectItem>
                        <SelectItem value="canceled">Cancelled</SelectItem>
                        <SelectItem value="complete">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-6 border-b text-gray-700">
                    {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : 'N/A'}
                  </td>
                  <td className="py-3 px-6 border-b text-gray-700">
                    {ticket.updated_at ? new Date(ticket.updated_at).toLocaleString() : 'N/A'}
                  </td>
                  <td className="py-3 px-6 border-b text-gray-700"><a href={`/messages`}>Chat</a></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-3 px-6 text-center text-gray-500">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={statusDialog.open}
        onOpenChange={(open) =>
          setStatusDialog({ ...statusDialog, open, message: open ? statusDialog.message : '' })
        }
      >
        <DialogContent className="sm:max-w-[500px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Update Ticket Status
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Status: <span className="capitalize">{statusDialog.status || 'N/A'}</span>
              </label>
            </div>
            <div>
              <label htmlFor="statusMessage" className="block text-sm font-medium text-gray-600">
                Reason for status change
              </label>
              <Textarea
                id="statusMessage"
                value={statusDialog.message}
                onChange={(e) => setStatusDialog({ ...statusDialog, message: e.target.value })}
                placeholder="Enter your reason for the status change..."
                rows={5}
                className="mt-2 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="secondary"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() =>
                setStatusDialog({ open: false, ticketId: null, status: '', message: '' })
              }
              disabled={statusLoading}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={handleStatusDialogSubmit}
              disabled={statusLoading}
            >
              {statusLoading ? 'Sending...' : 'Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default Support;