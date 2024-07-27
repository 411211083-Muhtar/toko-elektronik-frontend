import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = ({ onEdit }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('/api/customers');
    setCustomers(response.data);
  };

  const handleDelete = async (customer_id) => {
    await axios.delete(`/api/customers/${customer_id}`);
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.customer_id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button className="btn btn-primary" onClick={() => onEdit(customer)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(customer.customer_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
