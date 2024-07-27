import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Pastikan untuk mengimpor file CSS

const Payment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
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

  const handlePay = () => {
    if (validateForm()) {
      // Tambahkan logika untuk melanjutkan proses pembayaran
      console.log('Pembayaran berhasil:', form);
      navigate('/confirmation');
    }
  };

  return (
    <div className="payment-container">
      <h1>Pembayaran</h1>
      <form className="payment-form">
        <div className="form-group">
          <label>Nomor Kartu</label>
          <input type="text" name="cardNumber" className="form-control" value={form.cardNumber} onChange={handleChange} required />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>
        <div className="form-group">
          <label>Nama di Kartu</label>
          <input type="text" name="cardName" className="form-control" value={form.cardName} onChange={handleChange} required />
          {errors.cardName && <span className="error">{errors.cardName}</span>}
        </div>
        <div className="form-group">
          <label>Tanggal Kedaluwarsa</label>
          <input type="text" name="expiryDate" className="form-control" value={form.expiryDate} onChange={handleChange} required />
          {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input type="text" name="cvv" className="form-control" value={form.cvv} onChange={handleChange} required />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
      </form>
      <div className="payment-actions">
        <button className="btn btn-secondary" onClick={handleBack}>Kembali</button>
        <button className="btn btn-primary" onClick={handlePay}>Bayar Sekarang</button>
      </div>
    </div>
  );
};

export default Payment;
