import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SaleList = ({ onEdit }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const response = await axios.get('/api/sales');
    setSales(response.data);
  };

  const handleDelete = async (sale_id) => {
    await axios.delete(`/api/sales/${sale_id}`);
    fetchSales();
  };

  return (
    <div>
      <h2>Sales</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Customer ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.sale_id}>
              <td>{sale.product_id}</td>
              <td>{sale.customer_id}</td>
              <td>{sale.quantity}</td>
              <td>{sale.total_price}</td>
              <td>
                <button className="btn btn-primary" onClick={() => onEdit(sale)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(sale.sale_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleList;
