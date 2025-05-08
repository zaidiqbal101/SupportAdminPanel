import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';

const TicketsPage = ({ tickets: initialTickets = [] }) => {
  const [tickets, setTickets] = useState(initialTickets);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    ticketId: null,
    status: '',
    message: '',
  });
  const [statusLoading, setStatusLoading] = useState(false);

  const handleStatusChange = (ticketId, value) => {
    setStatusDialog({
      open: true,
      ticketId,
      status: value,
      message: '',
    });
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

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Support Tickets</h1>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tickets</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Subject</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Departamento</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Prioridad</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Servicio</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Cuerpo</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Adjunto</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Estado</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Creado</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-600">Actualizado</th>
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
                        Ver
                      </a>
                    ) : (
                      'Ninguno'
                    )}
                  </td>
                  <td className="py-3 px-6 border-b">
                    <select
                      value={ticket.status || 'pending'}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className="w-[140px] rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="pending">Procesando</option>
                      <option value="canceled">Cancelado</option>
                      <option value="complete">Completado</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 border-b text-gray-700">
                    {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : 'N/A'}
                  </td>
                  <td className="py-3 px-6 border-b text-gray-700">
                    {ticket.updated_at ? new Date(ticket.updated_at).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-3 px-6 text-center text-gray-500">
                  No se encontraron tickets
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {statusDialog.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg sm:max-w-[500px] w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Actualizar Estado del Ticket</h2>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Estado: <span className="capitalize">{statusDialog.status || 'N/A'}</span>
                </label>
              </div>
              <div>
                <label htmlFor="statusMessage" className="block text-sm font-medium text-gray-600">
                  Razón para el cambio de estado
                </label>
                <textarea
                  id="statusMessage"
                  value={statusDialog.message}
                  onChange={(e) => setStatusDialog({ ...statusDialog, message: e.target.value })}
                  placeholder="Ingrese la razón para el cambio de estado..."
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 p-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() =>
                  setStatusDialog({ open: false, ticketId: null, status: '', message: '' })
                }
                disabled={statusLoading}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleStatusDialogSubmit}
                disabled={statusLoading}
              >
                {statusLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TicketsPage;