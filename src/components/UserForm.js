import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, onSave }) => {
  const [user, setUser] = useState({
    user_id: '',
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { username, value } = e.target;
    setUser({ ...user, [username]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.user_id) {
      await axios.put(`/api/users/${user.user_id}`, user);
    } else {
      await axios.post('/api/users', user);
    }
    onSave();
    setUser({ user_id: '', username: '', email: '', password: '' });
  };

  return (
    <div>
      <h2>{user.user_id ? 'Edit' : 'Add'} User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="username" className="form-control" value={user.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
