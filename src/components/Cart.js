import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css'; // mengimpor file CSS

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h1>Troli Anda ({cart.reduce((sum, item) => sum + item.quantity, 0)} produk)</h1>
      {cart.length === 0 ? (
        <p>Troli Anda kosong.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image_url} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.product_id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.product_id)}>+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
            <div className="cart-actions">
              <button className="btn btn-primary" onClick={handleCheckout}>Bayar Sekarang</button>
              <Link to="/products" className="continue-shopping-link">
                Lanjut berbelanja &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
