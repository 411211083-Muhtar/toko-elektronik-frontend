import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductPage = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image_url') {
      setProduct({ ...product, image_url: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image_url', product.image_url);

    try {
      await axios.put(`/api/products/${product_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" className="form-control" value={product.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image_url" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default EditProductPage;
