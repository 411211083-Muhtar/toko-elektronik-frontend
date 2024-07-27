import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleForm = ({ selectedSale, onSave }) => {
  const [sale, setSale] = useState({
    sale_id: '',
    product_id: '',
    customer_id: '',
    quantity: '',
    total_price: ''
  });

  useEffect(() => {
    if (selectedSale) {
      setSale(selectedSale);
    }
  }, [selectedSale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sale.sale_id) {
      await axios.put(`/api/sales/${sale.sale_id}`, sale);
    } else {
      await axios.post('/api/sales', sale);
    }
    onSave();
    setSale({ sale_id: '', product_id: '', customer_id: '', quantity: '', total_price: '' });
  };

  return (
    <div>
      <h2>{sale.sale_id ? 'Edit' : 'Add'} Sale</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID</label>
          <input type="text" name="product_id" className="form-control" value={sale.product_id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Customer ID</label>
          <input type="text" name="customer_id" className="form-control" value={sale.customer_id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" className="form-control" value={sale.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Total Price</label>
          <input type="number" name="total_price" className="form-control" value={sale.total_price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default SaleForm;
