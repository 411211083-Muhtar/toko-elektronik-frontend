import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; 

const UserProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Mengambil fungsi addToCart dari context

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

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.product_id} className="product-item">
            <img src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProductsPage;
