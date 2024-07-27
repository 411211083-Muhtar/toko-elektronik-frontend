import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage'; // Halaman Produk
import AdminProductsPage from './components/AdminProductsPage';
import EditProductPage from './components/EditProductPage'; // Import komponen baru
import UserProductsPage from './components/UserProductsPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart'; // Halaman Keranjang Belanja
import Checkout from './components/Checkout'; // Halaman Checkout
import Payment from './components/Payment'; // Halaman Pembayaran
import Confirmation from './components/Confirmation'; // Halaman Konfirmasi
import SignIn from './components/SignIn'; // Halaman Sign In
import SignUp from './components/SignUp'; // Halaman Sign Up
import Orders from './components/Orders'; // Halaman Pemesanan
import { CartProvider } from './context/CartContext'; // Context untuk Keranjang Belanja

const App = () => {
  const userRole = localStorage.getItem('role');
  return (
    <Router>
       <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/products" element={<ProductsPage />} /><Route path="/products" element={userRole === 'admin' ? <AdminProductsPage /> : <UserProductsPage />} />
        <Route path="/product/:product_id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/product/edit/:product_id" element={<EditProductPage />} /> {/* Tambahkan route baru */}
      </Routes>
      <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;
