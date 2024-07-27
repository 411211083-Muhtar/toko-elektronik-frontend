import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; // Pastikan untuk mengimpor file CSS

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Pemesanan</h1>
      {orders.length === 0 ? (
        <p>Anda belum memiliki pesanan.</p>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.id}>
              <h2>Pesanan #{order.order_id}</h2>
              <p>Nama: {order.customer_name}</p>
              <p>Email: {order.customer_email}</p>
              <p>Produk: {order.product_name}</p>
              <p>Jumlah: {order.quantity}</p>
              <p>Total Harga: ${order.total_price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
