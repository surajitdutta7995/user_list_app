import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data.data);
    } catch (error) {
      setMessage('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(API_URL, formData);
      setMessage('User created successfully!');
      setFormData({ name: '', email: '', age: '', city: '' });
      fetchUsers();
    } catch (error) {
      setMessage('Error creating user: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/${editingUser}`, formData);
      setMessage('User updated successfully!');
      setFormData({ name: '', email: '', age: '', city: '' });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setMessage('Error updating user: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/${id}`);
        setMessage('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        setMessage('Error deleting user: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit user - populate form
  const editUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      city: user.city
    });
    setEditingUser(user._id);
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData({ name: '', email: '', age: '', city: '' });
    setEditingUser(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="App">
      <div className="container">
        <h1>MERN CRUD Demo</h1>
        
        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {/* User Form */}
        <div className="form-section">
          <h2>{editingUser ? 'Update User' : 'Add New User'}</h2>
          <form onSubmit={editingUser ? updateUser : createUser}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="1"
                max="120"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : (editingUser ? 'Update User' : 'Create User')}
              </button>
              {editingUser && (
                <button type="button" onClick={cancelEdit} className="cancel-btn">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="users-section">
          <h2>Users List ({users.length})</h2>
          {loading && <p>Loading...</p>}
          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                <div className="user-actions">
                  <button onClick={() => editUser(user)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {users.length === 0 && !loading && (
            <p className="no-users">No users found. Create your first user!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
