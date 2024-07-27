import React, { useContext, useState } from 'react'; // Tambahkan useState di sini

import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Checkout.css'; // Pastikan untuk mengimpor file CSS

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    district: '',
    subdistrict: '',
    postalCode: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach(key => {
      if (!form[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate('/payment');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form className="checkout-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Nama Depan</label>
          <input type="text" name="firstName" className="form-control" value={form.firstName} onChange={handleChange} required />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Nama Belakang</label>
          <input type="text" name="lastName" className="form-control" value={form.lastName} onChange={handleChange} required />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Alamat</label>
          <input type="text" name="address" className="form-control" value={form.address} onChange={handleChange} required />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Kota</label>
          <input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} required />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>Kecamatan</label>
          <input type="text" name="district" className="form-control" value={form.district} onChange={handleChange} required />
          {errors.district && <span className="error">{errors.district}</span>}
        </div>
        <div className="form-group">
          <label>Kelurahan</label>
          <input type="text" name="subdistrict" className="form-control" value={form.subdistrict} onChange={handleChange} required />
          {errors.subdistrict && <span className="error">{errors.subdistrict}</span>}
        </div>
        <div className="form-group">
          <label>Kode Pos</label>
          <input type="text" name="postalCode" className="form-control" value={form.postalCode} onChange={handleChange} required />
          {errors.postalCode && <span className="error">{errors.postalCode}</span>}
        </div>
        <div className="form-group">
          <label>Nomor Handphone</label>
          <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </form>
      <div className="checkout-summary">
        <h2>Ringkasan Pesanan</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${total.toFixed(2)}</h3>
        <div className="checkout-actions">
          <button className="btn btn-secondary" onClick={handleBack}>Kembali</button>
          <button className="btn btn-primary" onClick={handleContinue}>Lanjutkan</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
