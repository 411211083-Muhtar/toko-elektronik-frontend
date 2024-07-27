import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleViewDetail = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.product_id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to Cart</button>
            <button onClick={() => handleViewDetail(product.product_id)} className="btn btn-secondary">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
