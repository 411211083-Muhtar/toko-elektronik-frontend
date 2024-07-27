import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css'; // Pastikan untuk mengimpor file CSS

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', form);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/products');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Sign In</h1>
      <form className="sign-in-form" onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
