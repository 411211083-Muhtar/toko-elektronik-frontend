import React, { useEffect, useState, useContext } from 'react'; // mengimpor useContext dari 'react'
import { useParams, useNavigate } from 'react-router-dom'; // mengimpor useNavigate dari 'react-router-dom'
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Import CartContext
import './ProductDetail.css'; // mengimpor file CSS

const ProductDetail = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Menggunakan CartContext

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${product_id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-detail-container">
      <img src={product.image_url} alt={product.name} className="product-image" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart} className="btn btn-primary">Tambah ke Troli</button>
    </div>
  );
};

export default ProductDetail;
