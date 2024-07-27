import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {CartProvider} from './context/CartContext'; // Tambahkan import ini

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Bungkus App dengan CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
