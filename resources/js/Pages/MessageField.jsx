import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarLayout from '@/components/SidebarLayout';
import Navbar from '@/Components/Navbar';

const MessageField = ({messages11}) => {
  console.log("Current user ID:", messages11);
  
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get CSRF token
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  // Set axios defaults
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Fetch messages from web route
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/messages', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Handle the data structure properly
      if (response.data && response.data.data) {
        setMessages(response.data.data);
      } else if (response.data) {
        setMessages(Array.isArray(response.data) ? response.data : []);
      } else {
        setMessages([]);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages. Please try again later.');
      console.error('Error fetching messages:', err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageContent.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`/messages/${messages11.id}`, {
        user_id: messages11,
        content: messageContent,
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Add new message to the list
      const newMessage = response.data.data || response.data;
      
      if (newMessage) {
        setMessages(prevMessages => [newMessage, ...prevMessages]);
      }
      
      // Clear the input field
      setMessageContent('');
      setError(null);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      await axios.patch(`/messages/${messageId}/read`, {}, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Update the message in the state
      setMessages(prevMessages => 
        prevMessages.map(message => 
          message.id === messageId ? { ...message, is_read: true } : message
        )
      );
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  };

  // Delete a message
  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`/messages/${messageId}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Remove the message from the state
      setMessages(prevMessages => 
        prevMessages.filter(message => message.id !== messageId)
      );
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <>
      <Navbar />
      <SidebarLayout>
    <div className="message-field-container">
      <h2 className="text-xl font-bold mb-4">Messages1</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <textarea
            className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Type your message here..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
            disabled={loading || !messageContent.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
      
      {/* Messages List with ALL DB Fields */}
      <div className="messages-list">
        {loading && messages.length === 0 ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">User ID</th>
                  <th className="py-2 px-4 border-b text-left">Content</th>
                  <th className="py-2 px-4 border-b text-center">Read Status</th>
                  <th className="py-2 px-4 border-b text-left">Created At</th>
                  <th className="py-2 px-4 border-b text-left">Updated At</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(message => (
                  <tr 
                    key={message.id}
                    className={!message.is_read ? 'bg-blue-50' : ''}
                  >
                    <td className="py-2 px-4 border-b">{message.id}</td>
                    <td className="py-2 px-4 border-b">{message.user_id}</td>
                    <td className="py-2 px-4 border-b">{message.content}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {message.is_read ? 
                        <span className="text-green-500">Read</span> : 
                        <span className="text-yellow-500">Unread</span>
                      }
                    </td>
                    <td className="py-2 px-4 border-b">{formatDate(message.created_at)}</td>
                    <td className="py-2 px-4 border-b">{formatDate(message.updated_at)}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex justify-center space-x-2">
                        {!message.is_read && (
                          <button
                            onClick={() => markAsRead(message.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                            title="Mark as read"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                          title="Delete message"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </SidebarLayout>
    </>
  );
};

export default MessageField;