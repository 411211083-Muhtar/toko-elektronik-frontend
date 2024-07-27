import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerForm = ({ selectedCustomer, onSave }) => {
  const [customer, setCustomer] = useState({
    customer_id: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (customer.customer_id) {
      await axios.put(`/api/customers/${customer.customer_id}`, customer);
    } else {
      await axios.post('/api/customers', customer);
    }
    onSave();
    setCustomer({ customer_id: '', name: '', email: '', phone: '' });
  };

  return (
    <div>
      <h2>{customer.customer_id ? 'Edit' : 'Add'} Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={customer.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={customer.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" className="form-control" value={customer.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default CustomerForm;
